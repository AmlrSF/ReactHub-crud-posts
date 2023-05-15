import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import { userContext } from '../context/context';
const Dashboard = () => {
    const {user}  = useContext(userContext);
  return (
    <div className='w-full h-full sm:p-6 p-2 '>
        <div className='
        sm:p-5 p-2 rounded-[15px]
         bg-[#6569ff] 
         flex items-center justify-between 
         w-full h-[150px]'>
            <h1 className='text-[22px] sm:text-[28px] text-white'>
                welcome <span className='te'>{user}</span> <br /> to  your Dashboard
            </h1>
            <Link  to='/Dashboard/Profile'>
                <div className='bg-[#fff] rounded-md p-3'>
                    <i className="text-black text-[20px] fa-regular fa-user fa-fw"></i>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Dashboard