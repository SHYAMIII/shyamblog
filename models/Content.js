
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ContentSchema = new Schema({
  title: String,
  slug: String,
  date: String,
  description: String,
  author: String,
  content: String,
  image: String,
});


const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);
export default Content;



// const Content = model("Content", ContentSchema);

// export default mongoose.models?.Content || Content;