import { v2 as cloudinary } from "cloudinary";
import modifyUiModel from "../models/modifyUiModel.js";

// ADD LOGO
const addLogo = async (req, res) => {
  try {
    const logo = req.files?.logo_img?.[0];
    if (!logo)
      return res
        .status(400)
        .json({ success: false, message: "Logo file missing" });

    const result = await cloudinary.uploader.upload(logo.path, {
      resource_type: "image",
    });

    let uiData = await modifyUiModel.findOne();
    if (uiData) {
      uiData.logo_img = result.secure_url;
      await uiData.save();
    } else {
      uiData = new modifyUiModel({ logo_img: result.secure_url });
      await uiData.save();
    }

    res.json({ success: true, message: "Logo Added", data: uiData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADD HERO IMAGE
const addHeroImage = async (req, res) => {
  try {
    const hero = req.files?.hero_img?.[0];
    if (!hero)
      return res
        .status(400)
        .json({ success: false, message: "Hero image file missing" });

    const result = await cloudinary.uploader.upload(hero.path, {
      resource_type: "image",
    });

    let uiData = await modifyUiModel.findOne();
    if (uiData) {
      uiData.hero_img = result.secure_url;
      await uiData.save();
    } else {
      uiData = new modifyUiModel({ hero_img: result.secure_url });
      await uiData.save();
    }

    res.json({ success: true, message: "Hero Image Added", data: uiData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET LOGO
const getLogo = async (req, res) => {
  try {
    const data = await modifyUiModel.findOne();
    res.json({ success: true, logo_img: data?.logo_img || null });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET HERO IMAGE
const getHeroImage = async (req, res) => {
  try {
    const data = await modifyUiModel.findOne();
    res.json({ success: true, hero_img: data?.hero_img || null });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export { addLogo, addHeroImage, getLogo, getHeroImage };
