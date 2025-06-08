import footerModel from "../models/footerModel.js";

// ADD FOOTER
export const addFooter = async (req, res) => {
  const { description, number, email, address, social } = req.body;
  try {
    const footer = await footerModel.create({
      description,
      number,
      email,
      address,
      social,
    });
    res.json({ success: true, message: "Footer Added", data: footer });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// GET FOOTER
export const getFooter = async (req, res) => {
  try {
    const footer = await footerModel.find();
    res.json({ success: true, data: footer });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
