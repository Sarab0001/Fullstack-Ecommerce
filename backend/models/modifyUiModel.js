import mongoose from "mongoose";

const modifyUiSchema = new mongoose.Schema(
  {
    logo_img: { type: String },
    hero_img: { type: String },
  },
  { timestamps: true }
);

const modifyUiModel = mongoose.model("modifyUi", modifyUiSchema);
export default modifyUiModel;
