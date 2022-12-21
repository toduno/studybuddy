import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useSignup } from '../hooks/useSignup';


// const Signup = () => {
//     const [form, setForm] = useState({
//         firstName: '',
//         lastName: '',
//         username: '',
//         email: '',
//         password: '',
//         photo: '',
//         // confirmPassword: ''
//     })
//     const { signup, error, isLoading } = useSignup() //isLoading will be used to disable the button if
//     //isLoading is true so the request currently going won't send another one right away

//     //const navigate = useNavigate()


//     const updateForm = (value) => {
//         return setForm(prev => {
//             return {...prev, ...value}  
//         })
//     }

//     const handlePhoto = (e) => {
//         setForm({...form, photo: e.target.files[0]})
//     }

//     const onSubmit = async (e) => {
//         const formData  = new FormData();
//         for(const prop in form) {
//             // formData.append(prop, form[prop]);
//             formData.append(prop, prop !== 'photo' ? form[prop] : JSON.stringify(form[prop]))
//         }

//         console.log(form, 'this is the form')
//         e.preventDefault()

//         await signup(form)
//     }


//     return (
//         <div className='h-[100vh]'>
//             <div className='fixed inset-0 z-10 overflow-y-auto '>
//                 <div className='fixed inset-0 w-full h-full bg-black opacity-40'></div>
                
//                 <div className='flex justify-center items-center min-h-screen'>
//                     <div className='relative w-full max-w-sm md:max-w-md mx-auto '>
//                         <div className='bg-white rounded-md shadow-lg'> 
                        
//                             <div className='mt-2 px-4 md:px-5 pb-2 pt-5 md:pt-1 md:mt-0'>
//                                 <div className='self-start border-b-[1px] mb-4'>
//                                     <h3 className='font-bold text-2xl md:text-3xl md:mt-4'>Sign Up</h3>
//                                     <p className='text-gray-500 mt-3 mb-4'>Please fill in this form to create an account!</p>
//                                 </div>

//                                 <form onSubmit={onSubmit} encType='multipart/form-data'  className='w-full flex flex-col gap-y-4 md:gap-y-5'>
//                                     <div className='flex gap-x-4 w-full'>
//                                         <div className='w-full'>                           
//                                             <label htmlFor='fname'>First Name</label>
//                                             <input placeholder='Enter your first name' type='text' id='fname' value={form.firstName} onChange={(e) => updateForm({firstName: e.target.value})} 
//                                                 className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 w-full block rounded'/>
//                                         </div>

//                                         <div className='w-full'>
//                                             <label htmlFor='lname'>Last Name</label>
//                                             <input placeholder='Enter your surname' type='text' id='lname' value={form.lastName} onChange={(e) => updateForm({lastName: e.target.value})} 
//                                                 className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <label htmlFor='username'>Username</label>
//                                         <input placeholder='ex: johnny' type='text' id='username' value={form.username} onChange={(e) => updateForm({username: e.target.value})} 
//                                             className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
//                                     </div>

//                                     <div>
//                                         <label htmlFor='email'>Email Address</label>
//                                         <input placeholder='ex: email@address.com' type='email' id='email' value={form.email} onChange={(e) => updateForm({email: e.target.value})} 
//                                             className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
//                                     </div>

//                                     <div>
//                                         <label htmlFor='password'>Password</label>
//                                         <input placeholder='*****' type='password' id='password' value={form.password} onChange={(e) => updateForm({password: e.target.value})} 
//                                             className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
//                                     </div>

//                                     {/* <div>
//                                         <label htmlFor='confirmPassword'>Confirm Password</label>
//                                         <input placeholder='*****' type='password' id='confirmPassword' value={form.confirmPassword} onChange={(e) => updateForm({confirmPassword: e.target.value})} 
//                                             className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
//                                     </div> */}


//                                     <div>
//                                     <label htmlFor='name'>Upload Photo</label>
//                                     <input filename={form.photo} type='file' accept=".png, .jpg, .jpeg" id='photo' name='photo' 
//                                         onChange={handlePhoto}  className='block mt-1'/>
//                                     </div>

//                                     <div className='flex justify-between'>
//                                             <input type='submit' value="Create account" disabled={isLoading}
//                                             className='md:mt-2 font-semibold bg-blue-700 hover:bg-blue-600 px-4 md:px-8 py-2 text-white' />
//                                             <Link className='md:mt-2 font-semibold bg-orange-600 hover:bg-orange-500 px-12 md:px-16 py-2 text-white'
//                                                 to='/'>
//                                                 Cancel
//                                             </Link>
//                                     </div>

//                                     <div className='flex'>
//                                         <span>Already have an account?</span>
//                                         <Link  to='/login' className='font-semibold ml-2 text-blue-700 hover:text-blue-500 visited:text-purple-700 active:text-red-700'>Login</Link>
//                                     </div>

//                                     {error && <div>{error}</div>}
//                                  </form>
//                             </div> 
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//         </div>     
//     )
// }

// export default Signup



// const Signup = () => {
//     const [firstName, setFirstName] = useState('')
//     const [lastName, setLastName] = useState('')
//     const [username, setUsername] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [confirmPassword, setConfirmPassword] = useState('')
//     const [photo, setPhoto] = useState('')

//     const { signup, error, isLoading } = useSignup() //isLoading will be used to disable the button if
//     //isLoading is true so the request currently going won't send another one right away

//     const handlePhoto = (e) => {
//         setPhoto(e.target.files[0])
//     }
//     const formData  = new FormData();
//     formData.append('form', {photo});
    
//     const onSubmit = async (e) => {
//         console.log(firstName, lastName, username, email, password, formData, 'this is the form')
//         e.preventDefault()

//         await signup(firstName, lastName, username, email, password, formData)
//     }


//     return (
//         <div className='h-[100vh]'>
//             <div className='fixed inset-0 z-10 overflow-y-auto '>
//                 <div className='fixed inset-0 w-full h-full bg-black opacity-40'></div>
                
//                 <div className='flex justify-center items-center min-h-screen'>
//                     <div className='relative w-full max-w-sm md:max-w-md mx-auto '>
//                         <div className='bg-white rounded-md shadow-lg pb-4'> 
                        
//                             <div className='w-full mt-2 px-4 md:px-5 pb-2 pt-3 md:pt-1 md:mt-0 text-orange-900'>
//                                 <div className='self-start border-b-[1px] mb-4'>
//                                     <h3 className='font-bold text-2xl md:text-3xl md:mt-3'>Sign Up</h3>
//                                     <p className='text-gray-500 mt-2 mb-3'>Please fill in this form to create an account!</p>
//                                 </div>

//                                 <form onSubmit={onSubmit} encType='multipart/form-data' className='w-full flex flex-col gap-y-3'>
//                                     <div className='flex gap-x-4 w-full'>
//                                         <div className='w-full'>                           
//                                             <label htmlFor='fname'>First Name</label>
//                                             <input placeholder='Enter your first name' type='text' id='fname' value={firstName} onChange={(e) => setFirstName(e.target.value)} 
//                                                 className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 w-full block rounded'/>
//                                         </div>

//                                         <div className='w-full'>
//                                             <label htmlFor='lname'>Last Name</label>
//                                             <input placeholder='Enter your surname' type='text' id='lname' value={lastName} onChange={(e) => setLastName(e.target.value)} 
//                                                 className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <label htmlFor='username'>Username</label>
//                                         <input placeholder='ex: johnny' type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} 
//                                             className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
//                                     </div>

//                                     <div>
//                                         <label htmlFor='email'>Email Address</label>
//                                         <input placeholder='ex: email@address.com' type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} 
//                                             className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
//                                     </div>

//                                     <div>
//                                         <label htmlFor='password'>Password</label>
//                                         <input placeholder='*****' type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} 
//                                             className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
//                                     </div>

//                                     <div>
//                                         <label htmlFor='confirmPassword'>Confirm Password</label>
//                                         <input placeholder='*****' type='password' id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
//                                             className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
//                                     </div>

//                                     <div>
//                                         <label htmlFor='name'>Upload Photo</label>
//                                         <input type='file' accept=".png, .jpg, .jpeg" id='photo' name='photo' 
//                                             onChange={handlePhoto}  className='block mt-1'/>
//                                     </div>

//                                     <div className='flex justify-between'>
//                                             <input type='submit' value="Create account" disabled={isLoading}
//                                              className='md:mt-2 font-semibold bg-blue-700 hover:bg-blue-600 px-4 md:px-8 py-2 text-white' />
//                                             <Link className='md:mt-2 font-semibold bg-orange-600 hover:bg-orange-500 px-12 md:px-16 py-2 text-white'
//                                                 to='/'>
//                                                 Cancel
//                                             </Link>
//                                     </div>

//                                     <div className='flex'>
//                                         <span className='text-gray-500'>Already have an account?</span>
//                                         <Link  to='/login' className='font-semibold ml-2 text-blue-700 hover:text-blue-500 visited:text-purple-700 active:text-red-700'>Login</Link>
//                                     </div>

//                                     {error && <div className='rounded-md font-semibold py-1 px-2 bg-orange-50 border-[1.4px] border-red-500 text-red-700 '>{error}</div>}
//                                  </form>
//                             </div> 
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//         </div>     
//     )
// }

// export default Signup





const Signup = () => {
    const inputStyle = 'mt-1 bg-gray-100 hover:bg-blue-100 px-2 py-1 block w-full rounded-sm'

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        photo: '',
    })
  
    const {firstName, lastName, username, email, password, confirmPassword} = form
  
    const { signup, error, isLoading } = useSignup() //isLoading will be used to disable the button if
    //isLoading is true so the request currently going won't send another one right away
  
    
    const updateForm = (value) => {
        return setForm(prev => {
            return {...prev, ...value}  
        })
    }
  
    const handlePhoto = (e) => {
        setForm({...form, photo: e.target.files[0]})
    }
  
    const onSubmit = async (e) => {
        const formData  = new FormData();
        for(const prop in form) {
            formData.append(prop, form[prop]);
        }
  
        console.log(form, 'this is the form')
        e.preventDefault()
  
        await signup(formData)
    }
  
  
    return (
        <div className='h-[100vh]'>
            <div className='fixed inset-0 z-10 overflow-y-auto '>
                <div className='fixed inset-0 w-full h-full bg-black opacity-40'></div>
                
                <div className='flex justify-center items-center min-h-screen'>
                    <div className='relative w-full max-w-sm md:max-w-md mx-auto '>
                        <div className='bg-white rounded-md shadow-lg pb-4'> 
                        
                            <div className='w-full mt-2 px-4 md:px-5 pb-2 pt-3 md:pt-1 md:mt-0 text-orange-900'>
                                <div className='self-start border-b-[1px] mb-4'>
                                    <h3 className='font-bold text-2xl md:text-3xl md:mt-3'>Sign Up</h3>
                                    <p className='text-gray-500 mt-2 mb-3'>Please fill in this form to create an account!</p>
                                </div>
  
                                <form onSubmit={onSubmit} encType='multipart/form-data' className='w-full flex flex-col gap-y-3'>
                                    <div className='flex gap-x-4 w-full'>
                                        <div className='w-full'>                           
                                            <label htmlFor='fname'>First Name</label>
                                            <input placeholder='Enter your first name' type='text' id='fname' value={firstName} onChange={(e) => updateForm({firstName: e.target.value})} 
                                                className={inputStyle} />
                                        </div>
  
                                        <div className='w-full'>
                                            <label htmlFor='lname'>Last Name</label>
                                            <input placeholder='Enter your surname' type='text' id='lname' value={lastName} onChange={(e) => updateForm({lastName:e.target.value})} 
                                                className={inputStyle} />
                                        </div>
                                    </div>
  
                                    <div>
                                        <label htmlFor='username'>Username</label>
                                        <input placeholder='ex: johnny' type='text' id='username' value={username} onChange={(e) => updateForm({username:e.target.value})} 
                                            className={inputStyle} />
                                    </div>
  
                                    <div>
                                        <label htmlFor='email'>Email Address</label>
                                        <input placeholder='ex: email@address.com' type='email' id='email' value={email} onChange={(e) => updateForm({email: e.target.value})} 
                                            className={inputStyle} />
                                    </div>
  
                                    <div>
                                        <label htmlFor='password'>Password</label>
                                        <input placeholder='*****' type='password' id='password' value={password} onChange={(e) => updateForm({password: e.target.value})} 
                                            className={inputStyle} />
                                    </div>
  
                                    <div>
                                        <label htmlFor='confirmPassword'>Confirm Password</label>
                                        <input placeholder='*****' type='password' id='confirmPassword' value={confirmPassword} onChange={(e) => updateForm({confirmPassword: e.target.value})} 
                                            className={inputStyle} />
                                    </div>
  
                                    <div>
                                        <label htmlFor='name'>Upload Photo</label>
                                        <input type='file' accept=".png, .jpg, .jpeg" id='photo' name='photo' 
                                            onChange={handlePhoto}  className='block mt-1'/>
                                    </div>
  
                                    <div className='flex justify-between'>
                                            <input type='submit' value="Create account" disabled={isLoading}
                                            ffffff
                                             className='md:mt-2 font-semibold bg-blue-700 hover:bg-blue-600 px-4 md:px-8 py-2 text-white' />
                                            <Link className='md:mt-2 font-semibold bg-orange-600 hover:bg-orange-500 px-12 md:px-16 py-2 text-white'
                                                to='/'>
                                                Cancel
                                            </Link>
                                    </div>
  
                                    <div className='flex'>
                                        <span className='text-gray-500'>Already have an account?</span>
                                        <Link  to='/login' className='font-semibold ml-2 text-blue-700 hover:text-blue-500 visited:text-purple-700 active:text-red-700'>Login</Link>
                                    </div>
  
                                    {error && <div className='rounded-md font-semibold py-1 px-2 bg-orange-50 border-[1.4px] border-red-500 text-red-700 '>{error}</div>}
                                 </form>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            
        </div>     
    )
  }
  
  export default Signup
