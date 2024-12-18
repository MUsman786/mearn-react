const { imageUploadUtils } = require("../../helpers/coludinary");
const product = require("../../models/product");



const handleImageController = async (req, res) => {
  try {
    const b64 = req.file.buffer.toString('base64');
    const fileData = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtils(fileData);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error occurred while uploading the file.',
    });
  }
}

const addProduct = async(req,res)=>{
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock} =req.body

    const createProduct = new product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    })
    await createProduct.save()
    res.status(201).json({
      success: true,
      data:createProduct
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Error occured"
    })
  }
}

const fetchAllProduct = async(req,res)=>{
  try {
    
    const listProduct = await product.find(); 
    res.status(200).json({
      success:true,
      data:listProduct
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Error occured"
    })
  }
}
const editProduct = async(req,res)=>{
  try {
    const {id}= req.params
    const { title, description, category, brand, price, salePrice, totalStock } = req.body;
    const findProduct = await product.findByIdAndUpdate(id)
    if(!findProduct) res.status(404).json({
      success:false,
      message:"Product not found"
    })
    findProduct.title = title || findProduct.title
    findProduct.description = description || findProduct.description
    findProduct.category = category || findProduct.category
    findProduct.brand = brand || findProduct.brand
    findProduct.price = price || findProduct.price
    findProduct.salePrice = salePrice || findProduct.salePrice
    findProduct.totalStock = totalStock || findProduct.totalStock
    await findProduct.save()
    res.status(200).json({
      success:true,
      data:findProduct
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Error occured"
    })
  }
}
const deleteProduct = async(req,res)=>{
  try {
    const {id} =req.params
    const deleteProduct = await product.findByIdAndDelete(id);
    if(!deleteProduct) res.status(404).json({
      success:false,
      message:"Product not found"
    })
    res.status(200).json({
      success:true,
      message:"Product deleted successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Error occured"
    })
  }
}

module.exports = {handleImageController,addProduct,deleteProduct,editProduct,fetchAllProduct}