import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashbaoard from './pages/admin-view/dashboard'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import AdminFeatures from './pages/admin-view/fratures'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListion from './pages/shopping-view/listing'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from './components/ui/skeleton'

function App() {
  // const isAuthenticated =true
  // const user = {name:"usman",role:'user'}
  const {isAuthenticated,user,isLoading}= useSelector(state=>state.auth)
  const dispatch =useDispatch()
  useEffect(() => {
    
   dispatch(checkAuth())
  }, [dispatch])
  return (
    isLoading? <Skeleton className="w-[600px] h-[600px] " />    :
    <div className='fex flex-col overflow-hidden bg-white '>
      {/* common Component */}
      {/* <h1>Header Component</h1> */}
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
          }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
          }>
          <Route path="dashboard" element={<AdminDashbaoard/>}></Route>
          <Route path="orders" element={<AdminOrders/>}></Route>
          <Route path="products" element={<AdminProducts/>}></Route>
          <Route path="features" element={<AdminFeatures/>}></Route>
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
          }>
          <Route path="home" element={<ShoppingHome/>}></Route>
          <Route path="listing" element={<ShoppingListion/>}></Route>
          <Route path="checkout" element={<ShoppingCheckout/>}></Route>
          <Route path="account" element={<ShoppingAccount/>}></Route>
        </Route>
        <Route path="unauth-page" element={<UnauthPage/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>

      </Routes>
      

    </div>
  )
}

export default App
