import AdminProductCard from "@/components/admin-view/adminProductCard";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { addProductFormElements } from "@/components/common/config";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Description } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function AdminProducts() {
  const dispatch =useDispatch()
  // const selector =useSelector()
  const initialValue={
 image:null,
 title:'',
 description:'',
 category:'',
 brand:'',
 price:'',
 salePrice:'',
 totalStock:''
  }
 const isFormValidate=()=>{
  const {salePrice,...data}=formData
  return Object.keys(data).map((key)=>formData[key]!=='')
  .every((item)=>item)
 }
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])
  const  deleteProductById=(getProductId)=>{
    dispatch(deleteProduct(getProductId)).then(()=>{
     setOpenCreateProductDialog(false)
     setProductId(null)
     setFormData(initialValue)
     dispatch(fetchAllProducts())
    })
 }
  // const {ProductList}=useSelector(state=> state.adminProductSlice)
  const { ProductList } = useSelector(state => state.adminProduct);
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [formData, setFormData] = useState(initialValue)
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [productId , setProductId]=useState(null)
console.log(formData,productId)
const onSubmit=(e)=>{
  e.preventDefault()
    productId? dispatch(editProduct({id:productId,formData})).then(res=>{
      console.log(res)
      res?.payload?.success &&
      dispatch(fetchAllProducts())
        setImageFile(null)
        setFormData(initialValue)
        setOpenCreateProductDialog(false)
        toast({
          description: "Product Add Successfully",
          
        })
    }):
  dispatch(addNewProduct({
    ...formData,
    image:uploadedImageUrl
  })).then(res=>{
    console.log(res)
    res?.payload?.success &&
    dispatch(fetchAllProducts())
      setImageFile(null)
      setFormData(initialValue)
      setOpenCreateProductDialog(false)
      toast({
        description: "Product Add Successfully",
        
      })
  })
}
{console.log(ProductList)}
  return (
    <div className="mb-5 flex flex-col items-end flex-1">
      <Button className="flex mb-3" onClick={()=>setOpenCreateProductDialog(true)}>Add New Product</Button>
      <div className=" w-full grid gap-4 md:grid-cols-4">
        {
          ProductList && ProductList.length>0 && ProductList.map(product=>(
              <AdminProductCard
              initialValue={initialValue}
              setProductId={setProductId}
              setFormData ={setFormData}
              setOpenCreateProductDialog={setOpenCreateProductDialog}
               product={product}
               deleteProductById={deleteProductById}
                key={product._id}/>
            ))
        }
      </div>
      <Sheet open={openCreateProductDialog}  onOpenChange={()=>{setOpenCreateProductDialog(false)
        if(productId!==null){
          setFormData(initialValue)
          setProductId(null)
        }
      }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{productId?"Edit Product":"Add new Product"}</SheetTitle>
          </SheetHeader>
          <ProductImageUpload 
          setImageFile={setImageFile} 
          imageFile={imageFile} 
          productId={productId !== null}
          uploadedImageUrl={uploadedImageUrl} 
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
           />
          <div className="py-6">
            <CommonForm
            formControls={addProductFormElements}
            formData={formData}
            setFormData={setFormData}
            isFormValidate={!isFormValidate()}
            buttonText={productId?'Edit':'Add'}
            // productId={productId}
            onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
