
import { useState } from 'react';


import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';


const ConfirmDeleteAccount = ({userRecord}) => {
    const [showModal, setShowModal] = useState(false);
    const [record, setUserRecord] = useState(userRecord)

    const { user } = useAuthContext()
    const { logout } = useLogout()


    async function deleteAccount(id) {
        if (!user) {
            return
        }

        await fetch(`http://localhost:7001/u/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`//for protected route
            },
        })

        
        try {
            setUserRecord(!record)
            logout()

        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <div>
            <button onClick={() => setShowModal(true)} className='rounded-sm md:mt-2 font-semibold bg-orange-600 hover:bg-orange-500 px-7 md:px-10 py-1 text-white'>
                Delete account
            </button>

            {showModal ? (
                <>
                    <div className='fixed inset-0 z-10 overflow-y-auto'>
                        <div onClick={() =>setShowModal(false)} className='fixed inset-0 w-full h-full bg-black opacity-40'></div>
                        
                        <div className='flex justify-center items-center min-h-screen'>
                            <div className='relative w-full max-w-sm md:max-w-md mx-auto '>
                                <div className='bg-white rounded-md shadow-lg pb-4'> 
                                
                                <div className='mt-2 px-4 md:px-5 pb-1 md:pb-2 pt-3 md:mt-0 font-semibold'>
                                        <div className='self-start mb-10 md:mb-14'>
                                            <h3 className='text-lg md:text-xl'>Are you sure you want to delete account?</h3>
                                        </div>

                                
                                        
                                        <div className='flex justify-between'>
                                            <div onClick={() => deleteAccount(userRecord._id)}>
                                                <input type='submit' value="Confirm delete" className='bg-blue-700 hover:bg-blue-600 px-4 md:px-7 py-1 text-white' />
                                            </div>
                                            <div>
                                                <button className='font-semibold bg-orange-600 hover:bg-orange-500 px-7 md:px-10 py-1 text-white'
                                                    onClick={() => setShowModal(false)}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>

                                           
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


export default ConfirmDeleteAccount