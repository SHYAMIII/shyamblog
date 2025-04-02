import Content from "@/models/Content";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {

  
  
    let data =await request.json();
  console.log(data);
    const client = await mongoose.connect(process.env.MONGODB_URI)
    const NewContent = await new Content({
      title: data.title,
      description: data.description,
      slug: data.slug,
      date: Date.now(),
      author: data.author,
      image: data.image,
      content: data.content,
    })
    await NewContent.save();
  
    // console.log(product);
    return NextResponse.json({success: true,data:"yes",data})
    
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