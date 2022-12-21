import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';


export default function Create() {
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


    //methods
    //updates the state properties after creating new record
    const updateForm = (value) => {
        return setForm(prev => {
            return {...prev, ...value} //using spread to get previous and new or set state/value
        })
    }

    //handles form submission when creating a new record
    async function onSubmit(e) {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        //when a post request is sent to the 'create' url, add a new record to the database
        const newPerson = {...form}

       const response = await fetch('http://localhost:7001/record/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}` //for protected route
            },
            body: JSON.stringify(newPerson)
        })
        
        const json = await response.json() //json is the response data or object we get back


        if (!response.ok) {
            setError(json.error)
        }

        //reset the form after submission
        setForm({
            type: '',
            subject: '',
            topic: '',
            duration: '',
            notes: '',
        })

        window.location.reload()
    }


    return (
        <div>
            <button onClick={() => setShowModal(true)} className=' hover:text-orange-400'>
                Create Study
            </button>

            {showModal ? (
                <>
                    <div className='fixed inset-0 z-10 overflow-y-auto '>
                        <div onClick={() =>setShowModal(false)} className='fixed inset-0 w-full h-full bg-black opacity-50'></div>
                        
                        <div className='flex justify-center items-center min-h-screen'>
                            <div className='relative w-full max-w-sm md:max-w-md mx-auto '>
                                <div className='bg-white rounded-md shadow-lg pb-4'> 
                                
                                  <div className='text-left md:text-base mt-2 px-4 md:px-5 pb-2 md:pb-4 pt-3 md:pt-1 md:mt-0'>
                                        <div className='self-start border-b-[1px] mb-2 md:mb-4'>
                                            <h3 className='font-bold text-2xl md:text-3xl md:mt-4'>Create Study</h3>
                                            <p className='font-normal text-gray-500 mt-3 mb-2 md:mb-4'>Please fill in this form to create a new study plan!</p>
                                        </div>

                                        <form onSubmit={onSubmit} className='w-full flex flex-col gap-y-3 md:gap-y-2'>
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
                                                    <input type='submit' value="Create study" className='md:mt-2 font-semibold bg-blue-700 hover:bg-blue-600 px-4 md:px-8 py-2 text-white' />
                                                </div>
                                                <div>
                                                    <button className='md:mt-2 font-semibold bg-orange-600 hover:bg-orange-500 px-11 md:px-14 py-2 text-white'
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
