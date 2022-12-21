import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa'
import { useAuthContext } from '../hooks/useAuthContext';


export default function Edit({recordId}) {
    const inputStyle = 'text-black font-normal mt-1 bg-gray-100 hover:bg-blue-100 px-2 py-1 block w-full rounded-sm'

    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        type: '',
        subject: '',
        topic: '',
        duration: '',
        notes: ''
    })

    //gets access to the user token to protect route (i.e server route) from unauthenticated user
    const { user } = useAuthContext()


    //gets data that will be updated - by id (stored in the state object record property) on DOM rendering
    useEffect(() => {
        async function fetchData() {
            //get the response
            const response = await fetch(`http://localhost:7001/record/${recordId}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}` //for protected route
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
        
    }, [user, recordId]) 


    const updateForm = (value) => {
        return setForm(prev => {
            return {...prev, ...value} //using spread to get previous and new or set state/value
        })
    }

    //handles form submission when updating record
    async function onSubmit(e) {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        //when a post request is sent to the 'update (by id)' url, updates the record in the database
        const editStudyRecord = {
            ...form
        }

        const response = await fetch(`http://localhost:7001/record/update/${recordId}`, {
            method: 'PUT',
            body: JSON.stringify(editStudyRecord),
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
    }


    
    return (
        <div>
            <button onClick={() => setShowModal(true)} className=' hover:text-orange-400'>
                < FaEdit className='text-blue-700  hover:text-blue-500 bg-gray-100 rounded-full p-1 text-2xl' />
            </button>

            {showModal ? (
                <>
                    <div className='fixed inset-0 z-10 overflow-y-auto'>
                        <div onClick={() =>setShowModal(false)} className='fixed inset-0 w-full h-full bg-black opacity-50'></div>
                        
                        <div className='flex justify-center items-center min-h-screen'>
                            <div className='relative w-full max-w-sm md:max-w-md mx-auto '>
                                <div className='bg-white rounded-md shadow-lg pb-4'> 
                                
                                <div className='mt-2 px-4 md:px-5 pb-2 pt-3 md:pt-1 md:mt-0 text-orange-900 font-semibold'>
                                        <div className='self-start border-b-[1px] mb-2 md:mb-4'>
                                            <h3 className='font-bold text-2xl md:text-3xl md:mt-4'>Edit Study</h3>
                                            <p className='font-normal text-gray-500 mt-3 mb-2 md:mb-4'>Kindly enter the field you want to edit!</p>
                                        </div>

                                        <form onSubmit={onSubmit} encType='multipart/form-data' className='w-full flex flex-col gap-y-3 md:gap-y-2'>
                                            <div>
                                                <label htmlFor='type'>Type</label>
                                                <input type='text' id='type' value={form.type} onChange={(e) => updateForm({type: e.target.value})} 
                                                className={inputStyle} />
                                            </div>

                                            <div>
                                                <label htmlFor='subject'>Subject</label>
                                                <input type='text' id='subject' value={form.subject} onChange={(e) => updateForm({subject: e.target.value})} 
                                                className={inputStyle} />
                                            </div>

                                            <div>
                                                <label htmlFor='topic'>Topic</label>
                                                <input type='text' id='topic' value={form.topic} onChange={(e) => updateForm({topic: e.target.value})} 
                                                className={inputStyle} />
                                            </div>

                                            <div>
                                                <label htmlFor='duration'>Duration</label>
                                                <input type='text' id='duration' value={form.duration} onChange={(e) => updateForm({duration: e.target.value})} 
                                                className={inputStyle} />
                                            </div>

                                            <div>
                                                <label htmlFor='notes'>Notes</label>
                                                <textarea placeholder='Get good grades' id='notes' value={form.notes} onChange={(e) => updateForm({notes: e.target.value})}
                                                className={inputStyle}  >
                                                </textarea>
                                            </div>
                                        
                                            <div className='flex justify-between mt-2 md:mt-auto'>
                                                <div>
                                                    <input type='submit' value="Edit study" className='md:mt-2 font-semibold bg-blue-700 hover:bg-blue-600 px-4 md:px-7 py-1 text-white' />
                                                </div>
                                                <div>
                                                    <button className='md:mt-2 font-semibold bg-orange-600 hover:bg-orange-500 px-7 md:px-10 py-1 text-white'
                                                        onClick={() => setShowModal(false)}>
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
                </>
            ) : null}
        </div>
    )
}
