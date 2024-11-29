import { Outlet } from 'react-router-dom'
import ShopingHeader from './header'

export default function ShopingLayout() {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
      {/* common Header */}
      <ShopingHeader/>
      <main className='flex flex-col w-full'>
        <Outlet/>
      </main>
    </div>
  )
}
