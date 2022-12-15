import{ useState } from 'react';
import { Link } from 'react-router-dom'
import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';
import { useLogin } from '../hooks/useLogin';


// const Login = () => {
//     const [form, setForm] = useState({
//         email: '',
//         password: '',
//     })

//     const { login, error, isLoading } = useLogin() //isLoading will be used to disable the button if
//     //isLoading is true so the request currently going won't send another one right away

//     //const navigate = useNavigate()


//     const updateForm = (value) => {
//         return setForm(prev => {
//             return {...prev, ...value}  
//         })
//     }

//     async function onSubmit(e) {
//         console.log('Im logging in now')
//         e.preventDefault()

//         await login(form)
//     }


//     return (
//         <div className='h-[100vh]'>
//             <div className='fixed inset-0 z-10 overflow-y-auto '>
//                 <div className='fixed inset-0 w-full h-full bg-black opacity-40'></div>
                
//                 <div className='flex justify-center items-center min-h-screen'>
//                     <div className='relative w-full max-w-sm md:max-w-md mx-auto '>
//                     <div className='bg-white rounded-md shadow-lg pb-4'> 
                        
//                             <div className='w-full mt-2 px-4 md:px-5 pb-2 pt-5 md:pt-1 md:mt-0'>
//                                 <div className='self-start mb-4'>
//                                     <h3 className='font-bold text-2xl md:text-3xl md:mt-4'>Log In</h3>
//                                     <div className='flex items-center justify-center my-6 gap-x-7'>
//                                         <span className='bg-black hover:bg-gray-700 p-3 rounded-full'><FaGithub className='text-center text-white' /></span>
//                                         <span className='bg-red-700 hover:bg-red-600 p-3 rounded-full'><FaGoogle className='text-center text-white' /></span>
//                                         <span className='bg-blue-700 hover:bg-blue-600 p-3 rounded-full'><FaFacebookF className='text-center text-white' /></span>
//                                     </div>
//                                     <div className='border-b-[1px] w-full leading-[0.25em] text-center mb-0 mx-0'><span className='bg-white py-0 px-4'>or</span></div>
//                                 </div>

//                                 <form onSubmit={onSubmit} className='w-full flex flex-col gap-y-4 md:gap-y-5'>
//                                     <div>
//                                         <label htmlFor='username'>Email</label>
//                                         <input placeholder='ex: johnny' type='email' id='email' value={form.email} onChange={(e) => updateForm({email: e.target.value})} 
//                                             className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
//                                     </div>

//                                     <div>
//                                         <label htmlFor='password'>Password</label>
//                                         <input placeholder='*****' type='password' id='password' value={form.password} onChange={(e) => updateForm({password: e.target.value})} 
//                                             className='mb-1 mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
//                                         <span className='text-blue-700 hover:text-blue-500 visited:text-purple-700bactive:text-red-700 underline'>Forgot Password?</span>
//                                     </div>

//                                     <div className='flex justify-between'>
//                                             <input type='submit' value="Log in"  disabled={isLoading}
//                                              className='md:mt-2 font-semibold bg-blue-700 hover:bg-blue-600 px-8 md:px-12 py-2 text-white' />
//                                             <Link className='md:mt-2 font-semibold bg-orange-600 hover:bg-orange-500 px-8 md:px-12 py-2 text-white'
//                                                     to='/'>
//                                                 Cancel
//                                             </Link>
//                                     </div>

//                                     <div className='flex'>
//                                         <span>Don't have an account?</span>
//                                         <Link to='/signup' className='font-semibold ml-2 text-blue-700 hover:text-blue-500 visited:text-purple-700 active:text-red-700'>Register</Link>
//                                     </div>

//                                     {error && <div   className='rounded-sm text-semibold py-1 px-2 border-[1px] border-red-500 text-red-700'>{error}</div>}
//                                  </form>
//                             </div> 
//                         </div>
//                     </div>
//                 </div>       
//             </div>
//         </div>
//     )  
// }

// export default Login



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, error, isLoading } = useLogin() //isLoading will be used to disable the button if
    //isLoading is true so the request currently going won't send another one right away


    async function onSubmit(e) {
        console.log('Im logging in now')
        e.preventDefault()

        await login(email, password)
    }


    return (
        <div className='h-[100vh]'>
            <div className='fixed inset-0 z-10 overflow-y-auto '>
                <div className='fixed inset-0 w-full h-full bg-black opacity-40'></div>
                
                <div className='flex justify-center items-center min-h-screen'>
                    <div className='relative w-full max-w-sm md:max-w-md mx-auto '>
                        <div className='bg-white rounded-md shadow-lg pb-4'> 
                        
                            <div className='w-full mt-2 px-4 md:px-5 pb-2 pt-3 md:pt-1 md:mt-0 text-orange-900'>
                                <div className='self-start mb-4'>
                                    <h3 className='font-bold text-2xl md:text-3xl md:mt-4'>Log In</h3>
                                    <div className='flex items-center justify-center my-6 gap-x-7'>
                                        <span className='bg-black hover:bg-gray-700 p-3 rounded-full'><FaGithub className='text-center text-white' /></span>
                                        <span className='bg-red-700 hover:bg-red-600 p-3 rounded-full'><FaGoogle className='text-center text-white' /></span>
                                        <span className='bg-blue-700 hover:bg-blue-600 p-3 rounded-full'><FaFacebookF className='text-center text-white' /></span>
                                    </div>
                                    <div className='border-b-[1px] w-full leading-[0.25em] text-center mb-0 mx-0'><span className='bg-white py-0 px-4'>or</span></div>
                                </div>

                                <form onSubmit={onSubmit} className='w-full flex flex-col gap-y-3'>
                                    <div>
                                        <label htmlFor='username'>Email</label>
                                        <input placeholder='ex: johnny' type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} 
                                            className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
                                    </div>

                                    <div>
                                        <label htmlFor='password'>Password</label>
                                        <input placeholder='*****' type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} 
                                            className='mb-1 mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
                                        <span className='text-blue-700 hover:text-blue-500 visited:text-purple-700bactive:text-red-700 underline'>Forgot Password?</span>
                                    </div>

                                    <div className='flex justify-between'>
                                            <input type='submit' value="Log in"  disabled={isLoading}
                                             className='md:mt-2 font-semibold bg-blue-700 hover:bg-blue-600 px-8 md:px-12 py-2 text-white' />
                                            <Link className='md:mt-2 font-semibold bg-orange-600 hover:bg-orange-500 px-8 md:px-12 py-2 text-white'
                                                    to='/'>
                                                Cancel
                                            </Link>
                                    </div>

                                    <div className='flex'>
                                        <span className='text-black'>Don't have an account?</span>
                                        <Link to='/signup' className='font-semibold ml-2 text-blue-700 hover:text-blue-500 visited:text-purple-700 active:text-red-700'>Register</Link>
                                    </div>

                                    {error && <div className='rounded-md font-semibold py-1 px-2 bg-orange-50 border-[1.4px] border-red-700 text-red-700'>{error}</div>}
                                </form>
                            </div> 
                        </div>
                    </div>
                </div>       
            </div>
        </div>
    )  
}

export default Login