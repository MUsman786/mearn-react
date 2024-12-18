import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SheetTrigger, Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../common/config";
import { DropdownMenu , DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AvatarFallback, Avatar } from "../ui/avatar";
import { logOutUser } from "@/store/auth-slice";

const MenuItems = () => {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {
        shoppingViewHeaderMenuItems?.map(menuItem => <Link key={menuItem.id} to={menuItem.path} className="text-sm font-medium">
          {menuItem.label}
        </Link>)
      }

    </nav>
  )
}
const HeaderRightContent = ({user}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return <div className="flex lg:items-center lg:flex-row flex-col gap-4">
    <Button variant="outline" size="icon">
      <ShoppingCart className="h-4 w-4" />
      <span className="sr-only">User Cart</span>
    </Button>
    {console.log(user)}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar >
          <AvatarFallback className="bg-black text-white font-bold">{user?.name [0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 animate-right" side="right">
        <DropdownMenuLabel >
          Logged in as {user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator  />
        <DropdownMenuItem onClick={()=>{navigate('/shop/account')}}>
          <UserCog className="h-4 w-4"/>
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator  />
        <DropdownMenuItem onClick={()=>dispatch(logOutUser())}>
          <LogOut className="h-4 w-4"/>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}
export default function ShopingHeader() {
  const { isAuthenticated, user} = useSelector(state => state.auth)
  return (
    <header className="sticky top z-40 w-fullborder-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs ">
            <MenuItems />
            <HeaderRightContent user={user} />
          </SheetContent>
          <div className="hidden lg:block">
            <MenuItems />
          </div>
          <div className="hidden lg:block   ">
            <HeaderRightContent user={user} />
          </div>
        </Sheet>
      </div>
    </header>
  )
}
