import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 9.9,
  },
  Stocks: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Reviews: {
    type: [String],
    required: true,
  },
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
