import { useLocation, useNavigate } from "react-router-dom";
import { adminDashboardMenu } from "../common/config";
import DynamicIcon from "../common/config/Dynamic-Icon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet"
import { DialogTitle } from "@radix-ui/react-dialog";


 function Menu({setOpen}) {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <nav className="flex-col flex gap-2">
            {adminDashboardMenu.map(item => {
              return <div key={item.id} className={`flex items-center gap-2 rounded-md cursor-pointer px-3 py-3 ${location.pathname==item.link?"bg-blue-50":'black'} hover:bg-blue-50 hover:text-blue-600`} onClick={() =>{ navigate(item.link),setOpen && setOpen(false)}}>
              {/* <item.icon className="size-8" />
               {location.pathname}
              {item.icon } */}
               <DynamicIcon color={location.pathname==item.link?"text-blue-600":'black'}  iconName={item.icon} size={18} />
               <h1 className={`text-large ${location.pathname==item.link?'text-blue-600':''}`}>{item.name}</h1>

             </div>
            })}
            </nav>
  )
}

export default function AdminSidebar({open,setOpen}) {
  const navigate = useNavigate()
  return (
    <>
   <Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="left" className="w-64">
    <div className="flex flex-col h-full">
      <SheetHeader>
      <div className="flex items-center gap-2 cursor-pointer mb-5 mt-5 border-b-2 pb-3"
          onClick={() => navigate('/admin/dashboard')}>
          <DynamicIcon iconName={'Atom'} size={28} />
          {/* <Atom  className="size-8"/> */}
          <DialogTitle asChild>

          <h1 className="text-xl">Admin panel</h1>
          </DialogTitle>
        </div>
      </SheetHeader>
      <Menu setOpen={setOpen}/>
    </div>
  </SheetContent>
</Sheet>

      <aside className="hidden w:64 lg:flex flex-col border-r p-6 bg-background">

        <div className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/admin/dashboard')}>
          <DynamicIcon iconName={'Atom'} size={28} />
          {/* <Atom  className="size-8"/> */}
          <h1 className="text-xl font-extrabold">Admin panel</h1>
        </div>
        <div className="mt-5 mb-5 ">
        
          <Menu/>
            
               {/* <div key={item.id} className={"flex items-center flex-start gap-2 cursor-pointer py-3"} onClick={() => navigate(item.link)}>
                <item.icon className="size-8" />
                 {location.pathname}
                {item.icon }
                 <DynamicIcon color={location.pathname==item.link?"red":'black'}  iconName={item.icon} size={18} />
                 <h1 className={`text-large ${location.pathname==item.link?"text-red-600":''}`}>{item.name}</h1>

               </div> */}
          
        
        </div>
      </aside>
    </>
  )
}
