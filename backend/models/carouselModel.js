import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  carousel: {
    type: String,
  },
  show: {
    type: Boolean,
  },
});
const Carousel = mongoose.model("Carousel", carouselSchema);
export default Carousel;
