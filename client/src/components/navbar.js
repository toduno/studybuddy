//To create a navigation bar that will link us to the required components 


import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars }  from 'react-icons/fa';
import { FaTimes }  from 'react-icons/fa';

import Create from './create'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar =() => {
    const navItemStyle = 'hover:text-orange-400 active:text-orange-600'

    const [navbar, setNavbar] = useState(false)
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header className='w-full bg-white z-10 sticky top-0 right-0 shadow-sm px-3 py-2 md:px-10 md:py-3 text-orange-900 font-semibold'>
            
           <nav>
                <div className='justify-between mx-auto lg:max-w-7xl md:items-center md:flex'>
                    
                    <div>
                        <div className='flex justify-between items-center'>
                            <NavLink to='/' className='hover:text-orange-400 font-bold text-xl md:3xl'>StudyBuddy</NavLink>
                            
                            <div className='md:hidden'>
                                <button onClick={() => setNavbar(!navbar)}
                                    className="p-1 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border">
                                    {navbar ? (
                                        <FaTimes className='w-4 h-4' />
                                    ) : (
                                        <FaBars className='w-4 h-4' />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    
                    <div>
                        <div className={`flex-1 justify-self-center pb-3 mt-4 md:block md:pb-0 md:mt-0 ${navbar?'block':'hidden'}`}>
                            <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'> 
                                    {user
                                        ? 
                                        <ul className='flex flex-col gap-y-5 md:flex-row md:gap-x-7 md:items-center'>
                                            {/* <NavLink to='/dashboard' className={navItemStyle}>Dashboard</NavLink> */}
                                            <NavLink to={'/u/' + user._id} className={`flex md:justify-end md:items-center ${navItemStyle}`}>
                                                <img src={`http://localhost:7001/uploads/${user.photo}`} alt={user} 
                                                 className='rounded-full h-[5%] w-[5%] md:h-[4%] md:w-[4%] mr-2'   />
                                                <span>{user.email}</span>
                                            </NavLink>
                                            <Create />
                                            {/* <NavLink to='/records' className={navItemStyle}>My Record</NavLink>
                                            <NavLink to='/create' className={navItemStyle}>Create Record</NavLink>
                                            <NavLink to='/analytics' className={navItemStyle}>Analytics</NavLink> */}

                                            <li className={`rounded-sm bg-orange-600 hover:bg-orange-500 py-1 w-20 text-center text-white hover:text-white ${navItemStyle}`} onClick={handleClick}>Log out</li>
                                        </ul>
                                        : 
                                        <ul className='flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-7'>
                                            <NavLink to='/'  className={navItemStyle}>
                                                Home
                                            </NavLink>
                                            <NavLink to='/signup' className={`inline ${navItemStyle}`}>Sign up</NavLink>
                                            <NavLink to='/login' className={`inline ${navItemStyle}`}>Log in</NavLink>
                                        </ul>
                                    }
                            </ul>
                        </div>
                    </div>
                    
                </div>
           </nav>
        </header>
    )
}

export default Navbar