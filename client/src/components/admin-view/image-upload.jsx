import React, { useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'

export default function ProductImageUpload({productId, imageFile, setImageFile, UploadedImageUrl, setUploadedImageUrl, imageLoadingState, setImageLoadingState }) {
  const inputRef = useRef(null)
  const handleImageHandle = (e) => {
    const selectedFile = e.target.files?.[0]
    console.log(selectedFile)
    if (selectedFile) setImageFile(selectedFile)
  }
  const handleDragOver = (e) => {
    e.preventDefault()
  }
  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    console.log(droppedFile)
    droppedFile && setImageFile(droppedFile)
  }
  const handleRemove = (e) => {
    setImageFile(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }
  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true)
    const data = new FormData()
    data.append('file', imageFile)
    const response = await axios.post("http://localhost:8000/api/admin/products/upload-image", data)
    console.log(response.data.result.url)
    if (response?.data?.success) {
      setImageLoadingState(false)
      setUploadedImageUrl(response.data.result.url)
    }
  }
  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary()
  }, [imageFile])
// console.log(imageLoadingState,"=========")
  return (
    <div className='w-full max-w-md mx-auto'>
      <label className={`text-lg font-semibold mb-2 block `}>
        Upload Product Image
      </label>
      <div  onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4'>
        <Input id="image-upload" type="file" className="hidden" ref={inputRef}
          onChange={(e) => handleImageHandle(e)} disabled={productId}
        />
        {
          !imageFile ? <label htmlFor='image-upload' className={`flex flex-col items-center justify-center h-32 cursor-pointer  ${productId && 'cursor-not-allowed opacity-40'}`}>
            <UploadCloudIcon className='h-10 w-10 text-muted-foreground mb-2' />
            <span>Drag & drop or click to upload image</span>
          </label> :
            
            imageLoadingState?<Skeleton className="h-10  bg-gray-100"/>:
              <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <FileIcon className='w-8 h-8 text-primary mr-2' />
              </div>
              <p className='text-sm font-medium'>{imageFile.name}</p>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemove}>
                <XIcon className='h-4 w-4' />
                <span className='sr-only'> Remove File</span>
              </Button>
            </div>
            
        }
      </div>
    </div>
  )
}
