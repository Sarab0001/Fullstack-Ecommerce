import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
  description: String,
  number: String,
  email: String,
  address: String,
  social: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
  },
});
const footerModel =
  mongoose.models.footer || mongoose.model("footer", footerSchema);
export default footerModel;
