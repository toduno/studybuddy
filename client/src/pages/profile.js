import { useEffect, useState } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';

import EditProfile from '../components/editProfile'
import ConfirmDeleteAccount from '../components/confirmDeleteAccount';


const bold = 'font-semibold ml-1'


const User = (props) => (
   <div className='md:w-[95%] m-auto'>
        <div className='mx-auto bg-white max-w-[97%] md:w-[80%] p-3 md:p-4 rounded-md shadow-md w-auto leading-7 flex flex-col gap-y-3 md:gap-y-5 overflow-hidden'>
            <div>
                <h3 className='text-orange-800 text-xl md:text-2xl font-bold pb-1 md:mb-1'>Profile Info</h3>
                <div className='border-[1px]'></div>
            </div>

            <div className='py-5 md:py-10  mx-2 flex flex-col md:flex-row gap-y-4 md:justify-evenly md:items-center '>
                <img src={`http://localhost:7001/uploads/${props.record.photo}`} alt='student'
                        className='rounded-full h-36 w-36 md:h-60 md:w-60'  />
                    
                <ul className='leading-8 md:leading-10'>
                    <li>First name: <span className={bold}>{props.record.firstName}</span></li>
                    <li>Last name: <span className={bold}>{props.record.lastName}</span></li>
                    <li>Username: <span className={bold}>{props.record.username}</span></li>
                    <li>Email: <span className={bold}>{props.record.email}</span></li>
                    <li className='mr-1'>Password: <input type='password' value={props.record.password} disabled className='bg-white'/></li>
                </ul>
            </div>

            <ul>
                <li className='flex justify-between mb-2'>
                        <EditProfile recordId={props.record._id} />
                        <ConfirmDeleteAccount userRecord={props} />
                </li>
            </ul>
        </div>
    </div>
)


const Profile = () => {
    const [userRecord, setUserRecord] = useState([])

    //gets access to the user token to protect route (i.e server route) from unauthenticated user
    const { user } = useAuthContext()


    useEffect(() => {
        async function getRecord() {

            //get the response
            const response = await fetch(`http://localhost:7001/u/${user._id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`//for protected route
                },
            })
            if(!response.ok) return window.alert(`An error has occurred: ${response.statusText}`)

            //get the response data or json object
            const record = await response.json()
           
            //set the records state with the response data
            setUserRecord(record)
        }
        
        if (user) {
            getRecord()
        }

        return
    }, [userRecord.length, user]) 
    

    return (
        <div className='w-full py-14 px-2 md:px-5'>
            <User record={userRecord} /> 
        </div>
    )
}


export default Profile