//To serve as a viewing component for our records - it will fetch all the records in our database through a GET method


import { useEffect, useState } from 'react';

import { MdDeleteForever } from 'react-icons/md'
import { useAuthContext } from '../hooks/useAuthContext';
import Edit from './edit'
import Create from './create';


const Record = (props) => {
    const [checked, setChecked] = useState(props.record.completed)

    async function onChange() {
        setChecked(!checked)
        console.log(checked)

        const response = await fetch(`http://localhost:7001/record/update/${props.record._id}`, {
            method: 'PUT',
            body: JSON.stringify({completed: checked}) ,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.user.token}` //for protected route
            },
        })

        const json = await response.json()

        if (!response.ok) {
            console.log(json.error)
        } 
    }

    return (
        <div className={checked ? 'bg-opacity-30 bg-white md:w-[30%] py-2 px-3 rounded-md shadow-md w-full leading-6 md:leading-7' 
        : 'bg-white md:w-[30%] py-2 px-3 rounded-md shadow-md w-full leading-6 md:leading-7'}>
            <div className='mb-2 flex justify-between'>
                <div className='underline'>{props.record.type}</div>
                <input type='checkbox' checked={checked} onChange={onChange} />
            </div>
            <div className='text-lg md:text-xl font-semibold text-orange-700'>{props.record.subject}</div>
            <div className='font-semibold mb-1 md:my-1'>{props.record.topic}</div>
            <div className='mt-2 md:mt-3 mb-1'><small>{props.record.duration}</small></div>
            <div className={checked ? 'line-through bg-gray-100 p-1 overflow-y-auto h-9' : 'bg-gray-100 p-1 overflow-y-auto h-9'}><i>{props.record.notes}</i></div>
            <div className='flex justify-between mt-5'>
                <Edit recordId={props.record._id} />
                <button onClick={() => {props.deleteRecord(props.record._id)}}><MdDeleteForever className='text-red-700 hover:text-red-500 bg-gray-100 rounded-full p-1 text-2xl' /></button>
            </div>
        </div>
    )
}


export default function RecordList() {
    const [records, setRecords] = useState([])

    const { user } = useAuthContext()
    
    //fetch the records from the database (that will be stored in the state object records property) on DOM rendering
    useEffect(() => {
        async function getRecords() {
            //get the response
            const response = await fetch(`http://localhost:7001/record/`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`//for protected route
                },
            })
            if(!response.ok) return window.alert(`An error has occurred: ${response.statusText}`)

            //get the response data (in json format)
            const records = await response.json()
           
            //set the records state with the response data
            setRecords(records)
        }
        
        if (user) {
            getRecords()
        }

        return
    }, [records.length, user]) 


    //methods
    //delete a record (by id)
    async function deleteRecord(id) {
        if (!user) {
            return
        }

        await fetch(`http://localhost:7001/record/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`//for protected route
            },
        })

        //filter out all elements whose id is not equal to the url's
        try {
            const newRecords = records.filter((el) => el._id !== id)

            //update the records after deleting
            setRecords(newRecords)

        } catch (error) {
            console.log(error)
        }
    }

    //map out and list the records for all, active and completed tasks
    const recordList = () => {
        return records.map(record => {
            return (
                <Record record={record}  deleteRecord={() => deleteRecord(record._id)}  key={record._id} user={user} />
            )
        })
    }

    const recordListActive = () => {
        return records.map(record => {
            return (
                (record.completed === false)
                 &&
                <Record record={record}  deleteRecord={() => deleteRecord(record._id)}  key={record._id} user={user} />
            )
        })
    }

    const recordListComplete = () => {
        return records.map(record => {
            return (
                (record.completed !== false)
                 &&
                <Record record={record}  deleteRecord={() => deleteRecord(record._id)}  key={record._id} user={user} />
            )
        })
    }


    const style = 'border-2 shadow-md rounded-md px-2 md:px-3 py-1 hover:cursor-pointer hover:text-orange-600 hover:border-2 hover:border-orange-600 hover:font-semibold active:text-orange-500 active:font-semibold visited:text-orange-800'
    const [recordlist, setRecordList] = useState('')
    

    return (
        <div className='w-full py-6 md:py-9 px-2 md:px-5 '>
            {user &&
                <div className='mb-4 md:mb-6 md:text-center ml-1 text-gray-700'>
                    <h3 className='text-xl md:text-2xl font-semibold mb-2 md:mb-3 '>Welcome <span className='pl-1 text-white'>{user.username},</span></h3> 
                    <div className='md:text-lg flex md:justify-center md:items-center'>
                        <p>You have <span className='text-orange-900 font-bold'>{records.length}</span> {records.length > 1 ? 'plans' : 'plan'} created.</p>
                        <div className='flex ml-1 gap-x-1'> Click to <span className='text-orange-900 font-semibold'><Create /></span>cards.</div>
                    </div>
                </div>
            }
            
            <ul className='ml-1 flex gap-x-2 md:gap-x-3 md:items-center md:justify-center my-3'>
                <li className='self-center'>Show:</li>
                <li onClick={() => setRecordList(recordList())} className={style}>All</li>
                <li onClick={() => setRecordList(recordListActive())} className={style}>Active</li>
                <li onClick={() => setRecordList(recordListComplete())} className={style}>Completed</li>
            </ul>

            <div className='w-full border-white border-4 h-[65vh] md:h-[55vh] overflow-y-auto px-1 py-2 md:py-4 flex flex-col gap-y-3 md:gap-y-5 md:flex-row gap-x-7 m-auto md:justify-center md:items-center md:flex-wrap'>
                {recordlist === '' ? recordList() : recordlist}
            </div>
        </div>
    )
}