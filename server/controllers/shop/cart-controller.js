const Cart = require("../../models/cart");
const Product = require("../../models/product");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "userId, productId and quantity are required",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not Found!",
      });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      const newCart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });

      await newCart.save();
      return res.status(201).json({
        success: true,
        message: "Product added to cart",
      });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      console.log(cart, "cart");
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

const fetchCart = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "title price image salePrice",
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not Found!",
      });
    }
    const validItems = cart.items.filter((item) => item.productId !== null); // remove items whose product is deleted
    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }
    const cartItems = cart.items.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      price: item.productId.price,
      image: item.productId.image,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: { userId: cart.userId, items: cartItems },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

const updateCatrItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "userId, productId and quantity are required",
      });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not Found!",
      });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not Found in Cart!",
      });
    }
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Cart Updated",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

const deletCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "userId and productId are required",
      });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not Found!",
      });
    }
    const itemIndex = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    cart.items = itemIndex;
    await cart.save();
    const cartItems = cart.items.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      price: item.productId.price,
      image: item.productId.image,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      message: "Product removed from Cart",
      data: { userId: cart.userId, items: cartItems },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

module.exports = { addToCart, fetchCart, updateCatrItem, deletCartItems };
