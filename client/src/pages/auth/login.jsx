import { loginFormControls } from "@/components/common/config"
import CommonForm from "@/components/common/form"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { loginUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

export default function AuthLogin() {
  const dispatch = useDispatch()
  const Navigate =useNavigate()
  const {toast} = useToast()
  const initialState={
    email:'',
    password:'',
  }
  function onSubmit(e){
    e.preventDefault()
    dispatch(loginUser(formData)).then(data=>{
      console.log(data)
      if(data?.payload?.success){
        toast({
          description: data?.payload?.message,
          
        })
      }else{
        toast({
          description: data?.payload?.message,
           variant: "destructive" 
        })
      }
    })
  }
  const [formData, setFormData] = useState(initialState)
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new Account</h1>
        <p>Doyou have Account? 
          <Link className='font-medium ml-2 text-primary hover:underline' to={'/auth/register'}>Register</Link>
        </p>
      </div>
      <CommonForm
      formControls={loginFormControls}
      formData={formData}
      setFormData={setFormData}
      buttonText={'Sign In'}
      onSubmit={onSubmit}
      />
    </div>
  )
}
