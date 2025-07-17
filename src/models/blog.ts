import mongoose, { models } from "mongoose";

const blogSchema = new mongoose.Schema({
  image: { type: String },
  createTime: { type: String },
  title_en: { type: String },
  title_am: { type: String },
  description_am: { type: String },
  description_en: { type: String },
});

const Blog = models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
