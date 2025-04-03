import Content from "@/models/Content";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Helper function to generate URL-friendly slug
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();                  // Remove leading/trailing spaces
}

export async function POST(request) {
  try {
    let data = await request.json();
    console.log(data);

    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = generateSlug(data.title);
    } else {
      // Format provided slug to be URL-friendly
      data.slug = generateSlug(data.slug);
    }

    const client = await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if slug already exists
    const existingContent = await Content.findOne({ slug: data.slug });
    if (existingContent) {
      return NextResponse.json(
        { success: false, error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    const NewContent = await new Content({
      title: data.title,
      description: data.description,
      slug: data.slug,
      date: Date.now(),
      author: data.author,
      image: data.image,
      content: data.content,
    });
    
    await NewContent.save();
    return NextResponse.json({ success: true, data: NewContent });
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create content' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const contents = await Content.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: contents });
  } catch (error) {
    console.error('Error fetching contents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contents' },
      { status: 500 }
    );
  }
}