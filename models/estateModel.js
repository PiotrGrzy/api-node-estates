const mongoose = require("mongoose");

const estateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name of an estate is required"],
    trim: true,
    maxlength: [
      100,
      "The name od Estate must be shorter or equel 100 characters"
    ],
    minlength: [8, "The name of Estate must be longer or equel 8 characters"]
  },
  type: {
    type: String,
    required: [true, "The Estate must have a type chosen"],
    enum: {
      values: ["mieszkanie", "dom", "pokój"],
      message: "Type is either : mieszkanie, dom, pokój"
    }
  },
  area: {
    type: Number,
    required: [true, "Estate must have an area"]
  },
  rooms: {
    type: Number,
    required: [true, "Number of rooms is required"]
  },
  price: {
    type: Number,
    required: [true, "Estate must have a price"]
  },
  city: {
    type: String,
    required: [true, "City is required"]
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  contact: {
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: false
  }
});

const Estate = mongoose.model("Estate", estateSchema);

module.exports = Estate;
