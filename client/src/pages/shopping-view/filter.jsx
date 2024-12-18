import { filterOptions } from '@/components/common/config'
import { Checkbox } from "@/components/ui/checkbox"
import React from 'react'

export default function ProductFilter() {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
      <div className='p-4 border-b'>
        <h2 className='text-lg font-semibold'> Filters</h2>
      </div>
      <div className='p-4  space-y-4'>
        {
          Object.keys(filterOptions).map(productItem =>{
            return <>
            <h3 className='font-semibold'>
              {productItem}
            </h3>
            {filterOptions[productItem].map(item =>{
             
             return <label key={item.id} className='flex items-center gap-3'>
              <Checkbox />
              <span>{item.label}</span>
             </label>
                
              })}
            </>
          })
        }
      </div>
    </div>
  )
}
