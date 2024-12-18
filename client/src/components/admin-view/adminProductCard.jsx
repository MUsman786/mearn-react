import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { CarFront } from 'lucide-react'
import { Button } from '../ui/button'

export default function AdminProductCard({initialValue,product,setFormData,setProductId,setOpenCreateProductDialog,deleteProductById}) {
  
  return (
    <Card className="w-full max-sm mx-auto">
      <div>
        <div className='relative'>
          <img 
          className='w-full h-[300px] object-cover rounded-t-lg'
          src={product.image}
           alt={product.title} />
        </div>
        <CardContent>
          <h2 className='text-xl font-bold mb-2 mt-2'>{product.title}</h2>
          <div className='flex justify-between items-center mb-2 '>
            <span className={`${product.salePrice>0 && 'line-through'} text-lg font-semibold text-primary`}>${product.price} </span>
            <span className={`${product.salePrice<1 && 'hidden'}`}>${product.salePrice} </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center" >
          <Button onClick={()=>{
            setOpenCreateProductDialog(true)
            setProductId(product._id)
            setFormData(product)
          }}>Edit</Button>
          <Button onClick={()=>deleteProductById(product._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  )
}
