import mongoose, { models } from "mongoose";

const blogSchema = new mongoose.Schema({
  image: { type: String },
  createTime: { type: String },
  title_en: { type: String },
  title_am: { type: String },
  title_ru: { type: String, required: false },
  description_am: { type: String },
  description_en: { type: String },
  description_ru: { type: String, required: false },
});

// Delete the cached model to ensure schema updates are applied
if (models.Blog) {
  delete models.Blog;
}

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
