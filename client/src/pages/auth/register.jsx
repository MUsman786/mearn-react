import { registerFormControls } from '@/components/common/config'
import CommonForm from '@/components/common/form'
import { toast } from '@/hooks/use-toast'
import { registerUser } from '@/store/auth-slice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
const initialState={
  userName:'',
  email:'',
  password:'',
}
export default function AuthRegister() {
  const [formData, setFormData] = useState(initialState)
  const dispatch =useDispatch()
  const navigate = useNavigate()
  function onSubmit(e){
    e.preventDefault()
    dispatch(registerUser(formData)).then((data)=>{
      console.log(data)
      
     
    if(data?.payload?.success){
      toast({
        description: data?.payload?.message,
        
      })
      navigate('/auth/login')
    }else{
      toast({
        description: data?.payload?.message,
         variant: "destructive" 
      })
    }
    })
  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new Account</h1>
        <p>Already have Account 
          <Link className='font-medium ml-2 text-primary hover:underline' to={'/auth/login'}>Login</Link>
        </p>
      </div>
      <CommonForm
      formControls={registerFormControls}
      formData={formData}
      setFormData={setFormData}
      buttonText={'Sign Up'}
      onSubmit={onSubmit}
      />
    </div>
  )
}
