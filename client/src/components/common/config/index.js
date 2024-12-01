
export const registerFormControls =[
  {
    name:'userName',
    label:'User Name',
    Placeholder:'Enter your user name',
    componentType:'input',
    type:'text'
  },
  {
    name:'email',
    label:'User Email',
    Placeholder:'Enter your Email',
    componentType:'input',
    type:'email'
  },
  {
    name:'password',
    label:'User Password',
    Placeholder:'Enter your Password',
    componentType:'input',
    type:'password'
  }
]

export const loginFormControls =[
  {
    name:'email',
    label:'User Email',
    Placeholder:'Enter your Email',
    componentType:'input',
    type:'email'
  },
  {
    name:'password',
    label:'User Password',
    Placeholder:'Enter your Password',
    componentType:'input',
    type:'password'
  }
]

export const adminDashboardMenu = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: 'BookDashed', // Store the name of the Lucide icon
    link: '/admin/dashboard',
    
  },
  {
    id: 'products',
    name: 'Products',
    icon: 'Shirt',
    link: '/admin/products',
    
  },
  {
    id: 'orders',
    name: 'Orders',
    icon: 'ListOrdered',
    link: '/admin/orders',
    
  },
];
