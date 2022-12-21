import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ForgotPassword() {
    const inputStyle = 'text-black font-normal mt-2 bg-gray-100 hover:bg-blue-100 px-2 py-1 block w-full rounded-sm'

    const [error, setError] = useState(null)
    const [email, setEmail] = useState('')
    const [json, setJson] = useState('')

    const navigate = useNavigate()

    
    //method
    //handles form submission when creating a new record
    async function onSubmit(e) {
        e.preventDefault()

        //when a post request is sent to the 'create' url, add a new record to the database

       const response = await fetch('http://localhost:7001/forgotPassword', {
            method: 'POST',
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        })
        
        const json = await response.json() //json is the response data or object we get back

        if (!response.ok) {
            setError(json.error)
        } else {
            setJson([json])
            setTimeout(() => {
             setJson('')
            }, 3000)
        }

        console.log(json)

        //reset the form after submission
        setEmail('')

        //window.location.reload()
    }


    return (
        <div>
            <div className='fixed inset-0 z-10 overflow-y-auto '>
                <div className='fixed inset-0 w-full h-full bg-black opacity-40'></div>
                
                <div className='flex justify-center items-center min-h-screen'>
                    <div className='relative w-full max-w-sm md:max-w-md mx-auto '>
                        <div className='bg-white rounded-md shadow-lg pb-4'> 
                        
                            <div className={json? 'text-left md:text-base mt-2 px-3 md:px-4 pb-2 md:pb-4 pt-3 md:mt-0 text-orange-900' : 'text-left md:text-base mt-2 px-4 md:px-5 pb-2 md:pb-4 pt-1 md:mt-0 text-orange-900'}>
                                {json && <span className='rounded-sm text-semibold py-1 px-2 border-[1px] border-green-500 text-green-700'>{json}</span>}

                                <div className='self-start mt-3 mb-6'>
                                    <h3 className='font-bold text-2xl md:text-3xl md:mt-3'>Reset Password</h3>
                                </div>

                                <form onSubmit={onSubmit} className='w-full flex flex-col gap-y-3 md:gap-y-2'>
                                    <div>
                                        <label htmlFor='email'>Email Address</label>
                                        <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} 
                                        placeholder='ex: email@gmail.com' className={inputStyle} />
                                    </div>
                                    
                                    <div className='flex justify-between mt-2 md:mt-auto'>
                                        <div>
                                            <input type='submit' value="Send Reset Code" className='md:mt-2 font-semibold bg-blue-700 hover:bg-blue-600 px-4 md:px-8 py-2 text-white' />
                                        </div>
                                        <div>
                                            <button className='md:mt-2 font-semibold bg-orange-600 hover:bg-orange-500 px-11 md:px-14 py-2 text-white'
                                                onClick={() => navigate('/login')}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                    {error && <div className='rounded-sm text-semibold py-1 px-2 border-[1px] border-red-500 text-red-700'>{error}</div>}
                                </form>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
                 
        </div>
    )
}