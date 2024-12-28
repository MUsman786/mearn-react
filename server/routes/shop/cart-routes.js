const express = require("express");
const {
  addToCart,
  fetchCart,
  deletCartItems,
  updateCatrItem,
} = require("../../controllers/shop/cart-controller");

const router = express.Router();
router.post("/add", addToCart);
router.get("/get/:userId", fetchCart);
router.delete("/:userId/:productId", deletCartItems);
router.put("/update", updateCatrItem);
module.exports = router;
