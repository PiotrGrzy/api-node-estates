const Estate = require("../models/estateModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllEstates = async (req, res) => {
  try {
    const features = new APIFeatures(Estate.find(), req.query)
      .filter()
      .sort()
      .paginate();
    const estates = await features.query;
    res.status(200).json({
      status: "success",
      results: estates.length,
      data: {
        estates
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getEstate = async (req, res) => {
  try {
    const estate = await Estate.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        estate
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.createEstate = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    const newEstate = await Estate.create(req.body);
    newEstate.mainImage = req.file.path;
    res.status(200).json({
      status: "success",
      data: {
        estate: newEstate
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateEstate = async (req, res) => {
  try {
    const updatedEstate = await Estate.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        estate: updatedEstate
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteEstate = async (req, res) => {
  try {
    await Estate.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};
