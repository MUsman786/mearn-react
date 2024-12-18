const cloudinary =require("cloudinary").v2;
const multer= require("multer")

cloudinary.config({
  cloud_name: 'dgunjnzyp', 
  api_key: '862879882123928', 
  api_secret: 'xqP1x_8A_F3TlVal2OekPWfnktY'
})
const storage = new multer.memoryStorage()

async function imageUploadUtils(file){
  const result = await cloudinary.uploader.upload(file,{
    resource_type:'auto'
  })
return result
}

const upload = multer({storage})

module.exports ={upload,imageUploadUtils}