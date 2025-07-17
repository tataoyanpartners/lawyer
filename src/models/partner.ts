import mongoose, { models } from "mongoose";

const partnerSchema = new mongoose.Schema({
  image: { type: String },
  description_en: { type: String },
  description_am: { type: String },
  title_am: { type: String },
  title_en: { type: String },
});

const Partner = models.Partner || mongoose.model("Partner", partnerSchema);

export default Partner;
