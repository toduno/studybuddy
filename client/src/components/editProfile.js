import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';


const EditProfile = ({recordId}) => {
    const inputStyle = 'text-black font-normal mt-1 bg-gray-100 hover:bg-blue-100 px-2 py-1 block w-full rounded-sm'

    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    })
    const [confirmPassword, setConfirmPassword] = useState('')

    const {firstName, lastName, username, email, password} = form

    //gets access to the user token to protect route (i.e server route) from unauthenticated user
    const { user } = useAuthContext()


    //gets data that will be updated - by id (stored in the state object record property) on DOM rendering
    useEffect(() => {
        async function fetchData() {
            //get the response
            const response = await fetch(`http://localhost:7001/u/${user._id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`//for protected route
                },
            })

            if(!response.ok) {
                window.alert(`An error has occurred: ${response.statusText}`)
                return
            }

            //get the response data or json object
            const record = await response.json()
            if(!record) {
                window.alert(`An error has occurred: ${response.statusText}`)

                window.location.reload()

                return
            }
            setForm(record)
        }
        fetchData()
        return
        
    }, [user])


    const updateForm = (value) => {
        return setForm(prev => {
            return {...prev, ...value} //using spread to get previous and new or set state/value
        })
    }

    const handleConfirmPassword = (e) => {
       
       setConfirmPassword(e.target.value)
       console.log(confirmPassword)

        if (confirmPassword !== password) {
            setError('Passwords do not match!')
        } else {
            setError('')
        }
    }

    //method that will handle form submission when updating record
    async function onSubmit(e) {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        //when a post request is sent to the 'update (by id)' url, update the record in the database
        const editUser = {
            ...form
        }

        const response = await fetch(`http://localhost:7001/u/update/${recordId}`, {
            method: 'PUT',
            body: JSON.stringify(editUser),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`//for protected route
            },
        })

        const json = await response.json() //json is the response data or object we get back

        if (!response.ok) {
            setError(json.error)
        }
        
        window.location.reload() //you can't navigate to and fro since it's not a route but a modal that's why using this

        console.log(editUser)
    }


    return (
        <div>
            <button onClick={() => setShowModal(true)} className='md:mt-2 font-semibold bg-blue-700 hover:bg-blue-600 px-7 md:px-10 py-1 text-white rounded-sm'>
                Edit 
            </button>

            {showModal ? (
                <>
                    <div className='fixed inset-0 z-10 overflow-y-auto'>
                        <div onClick={() =>setShowModal(false)} className='fixed inset-0 w-full h-full bg-black opacity-50'></div>
                        
                        <div className='flex justify-center items-center min-h-screen'>
                            <div className='relative w-full max-w-sm md:max-w-md mx-auto '>
                                <div className='bg-white rounded-md shadow-lg pb-4'> 
                                
                                    <div className='mt-2 px-4 md:px-5 pb-2 pt-3 md:pt-1 md:mt-0 text-orange-900'>
                                        <div className='self-start border-b-[1px] mb-2 md:mb-4'>
                                            <h3 className='font-bold text-2xl md:text-3xl md:mt-4'>Edit Profile</h3>
                                            <p className='font-normal text-gray-500 mt-3 mb-2 md:mb-4'>Kindly enter the field(s) you want to edit!</p>
                                        </div>

                                        <form onSubmit={onSubmit} className='w-full flex flex-col gap-y-3'>
                                            <div className='flex gap-x-4 w-full'>
                                                <div className='w-full'>                           
                                                    <label htmlFor='fname'>First Name</label>
                                                    <input placeholder='Enter your first name' type='text' id='fname' value={firstName} onChange={(e) => updateForm({firstName: e.target.value})} 
                                                        className={inputStyle}/>
                                                </div>

                                                <div className='w-full'>
                                                    <label htmlFor='lname'>Last Name</label>
                                                    <input placeholder='Enter your surname' type='text' id='lname' value={lastName} onChange={(e) => updateForm({lastName:e.target.value})} 
                                                    className={inputStyle}/> 
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor='username'>Username</label>
                                                <input placeholder='ex: johnny' type='text' id='username' value={username} onChange={(e) => updateForm({username: e.target.value})} 
                                                    className={inputStyle}/>
                                            </div>

                                            <div>
                                                <label htmlFor='email'>Email Address</label>
                                                <input placeholder='ex: email@address.com' type='email' id='email' value={email} onChange={(e) => updateForm({email: e.target.value})} 
                                                    className={inputStyle}/>
                                            </div>

                                            <div>
                                                <label htmlFor='password'>Password</label>
                                                <input placeholder='*****' type='password' id='password' value={password} onChange={(e) => updateForm({password: e.target.value})} 
                                                    className={inputStyle}/>
                                            </div>

                                            <div>
                                                <label htmlFor='confirmPassword'>Confirm Password</label>
                                                <input placeholder='*****' type='password' id='confirmPassword' value={confirmPassword} onChange={handleConfirmPassword} 
                                                    className={inputStyle}/>
                                            </div>

                                            <div className={error? 'flex justify-between my-2' : 'flex justify-between mt-2'}>
                                                <input type='submit' value="Save" className='md:mt-2 font-semibold bg-blue-700 hover:bg-blue-600 px-8 md:px-11 md:
                                                py-1 text-white' />

                                                <button className='md:mt-2 font-semibold bg-orange-600 hover:bg-orange-500 px-7 md:px-10 md:py-1 text-white'
                                                    onClick={() => setShowModal(false)}>
                                                    Cancel
                                                </button>
                                            </div>
                                            
                                            {error && <div className='rounded-md py-1 px-2 bg-orange-50 border-[1.4px] border-red-500 text-red-700 mt-1'>{error}</div>}
                                        </form>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}


export default EditProfile