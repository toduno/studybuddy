import { useEffect, useState } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';

import EditProfile from '../components/editProfile'
import ConfirmDeleteAccount from '../components/confirmDeleteAccount';


const bold = 'font-semibold ml-1'


const User = (props) => (
   <div className='md:w-[95%] m-auto'>
        <div className='mx-auto bg-white max-w-[97%] md:w-[80%] p-3 md:p-4 rounded-sm shadow-md w-auto leading-7 flex flex-col gap-y-3 md:gap-y-5 overflow-hidden'>
            <h3 className='text-orange-800 text-xl md:text-2xl font-bold md:mb-1'>Profile Info</h3>
            <div className='border-[1px]'></div>

            <div>First name: <span className={bold}>{props.record.firstName}</span></div>
            <div>Last name: <span className={bold}>{props.record.lastName}</span></div>
            <div>Username: <span className={bold}>{props.record.username}</span></div>
            <div>Email: <span className={bold}>{props.record.email}</span></div>
            <div className='mr-1'>Password: <input type='password' value={props.record.password} disabled className='bg-white'/></div>
            <div className='flex justify-between mt-2 md:mt-3 mb-2'>
                <EditProfile recordId={props.record._id} />
                <ConfirmDeleteAccount userRecord={props} />
            </div>
        </div>
    </div>
)


const Profile = () => {
    const [userRecord, setUserRecord] = useState([])

    //gets the user token to protect route (i.e server route) from unauthenticated user
    const { user } = useAuthContext()


    useEffect(() => {
        async function getRecord() {

            //get the response
            const response = await fetch(`http://localhost:7001/u/${user.id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`//protected route
                },
            })
            if(!response.ok) return window.alert(`An error has occurred: ${response.statusText}`)

            //get the response data (in json format)
            const record = await response.json()
           
            //set the records state with the response data
            setUserRecord(record)
        }
        
        if (user) {
            getRecord()
        }

        return
    }, [userRecord.length, user]) //the useEffect hook function is going to be dependent on the records length (i.e the no of items 
    //the records has that will be gotten from the database)
    

    return (
        <div className='w-full py-14 px-2 md:px-5'>
            <User record={userRecord} /> 
        </div>
    )
}


export default Profile