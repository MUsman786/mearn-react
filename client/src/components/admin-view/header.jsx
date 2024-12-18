import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { checkAuth, logOutUser } from "@/store/auth-slice";

export default function AdminHeader({setOpen}) {
  const dispatch = useDispatch()
  // console.log(dispatch(()=>logOutUser()))
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-auto border-b-2">
    <Button className="lg:hidden sm:block" onClick={()=>setOpen(true)}>
    <AlignJustify />
    <span className="sr-only">Toogle Menu</span>
    </Button>
    <div className="flex flex-1 justify-end">
      <Button className="inline-flex gap-2 item-cente rounded-md px-4 py-2 shadow" onClick={()=>dispatch(logOutUser())}>
      <LogOut />
      Logout
      {/* <span>Log Out</span> */}
      </Button>
    </div>
  </header>
  )
}
