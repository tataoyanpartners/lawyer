import mongoose, { models } from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Delete the cached model to ensure schema updates are applied
if (models.Contact) {
  delete models.Contact;
}

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
