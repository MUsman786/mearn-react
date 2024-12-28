const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // userId is required
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true, // productId is required
      },
      quantity: {
        type: Number,
        required: true, // quantity is required
        min: 1,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
