const express = require("express")

const { handleImageController, addProduct, fetchAllProduct, editProduct, deleteProduct } = require("../../controllers/admin/product-controller");
const {upload} =require("../../helpers/coludinary")

const router = express.Router()

router.post('/upload-image',upload.single("file"),handleImageController)
router.post('/add',addProduct)
router.get('/all',fetchAllProduct)
router.put('/edit/:id',editProduct)
router.delete('/delete/:id',deleteProduct)

module.exports = router