import Carousel from "../models/carouselModel.js";

export const getCarousel = async (req, res) => {
  try {
    const carousel = await Carousel.find();
    res.status(200).json(carousel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCarousel = async (req, res) => {
  try {
    const existing = await Carousel.findOne();

    let savedCarousel;

    if (existing) {
      existing.carousel = req.body.carousel;
      existing.show = req.body.show;
      savedCarousel = await existing.save();
    } else {
      const newCarousel = new Carousel({
        carousel: req.body.carousel,
        show: req.body.show,
      });
      savedCarousel = await newCarousel.save();
    }

    res.status(200).json({
      success: true,
      message: "Carousel Added",
      data: savedCarousel,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
