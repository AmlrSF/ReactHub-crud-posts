import React from 'react'
import { Link } from 'react-router-dom'
const SideBar = () => {
  return (
    <div 
    className='sm:w-[170px] w-[50px] 
        min-h-[calc(100vh-64.4px)] 
        bg-[#6569ff] text-white
        p-2
     '>
        <Link to='/Dashboard/' className='text-xl mt-5 sm:block hidden text[#fff] text-center'>Dashbord</Link>
        <div className='mt-5'>
        <ul className='flex flex-col gap-2'>
          <li className='p-2 rounded-lg pointer bg-[rgba(255,255,255,.2)] '>
            <Link to='/Dashboard/Profile' className="flex justify-center gap-2  items-center">
              <i className="fa-regular fa-user fa-fw"></i>
              <span className='hidden sm:block'>Profile</span>
            </Link>
          </li>
          <li className='p-2 rounded bg-[rgba(255,255,255,.2)] '>
            <Link to='/Dashboard/Settings' className="flex justify-center gap-2  items-center">
            <i className="fa-solid fa-gear"></i>
              <span className='hidden sm:block'>Settings</span>
            </Link>
          </li>
          <li className='p-2 rounded-lg pointer bg-[rgba(255,255,255,.2)] '>
            <Link to='/Dashboard/CreatePost'  className="flex justify-center gap-2 items-center">
              <i className="fa-solid fa-diagram-project fa-fw"></i>
              <span className='hidden sm:block'>CreatePost</span>
            </Link>
          </li>
          <li className='p-2 rounded-lg pointer bg-[rgba(255,255,255,.2)] '>
            <Link className="flex justify-center gap-2  items-center">
              <i className="fa-solid fa-graduation-cap fa-fw"></i>
              <span className='hidden sm:block'>Courses</span>
            </Link>
          </li>
          <li className='p-2 rounded-lg pointer bg-[rgba(255,255,255,.2)] '>
            <Link className="flex justify-center gap-2  items-center" >
              <i className="fa-regular fa-circle-user fa-fw"></i>
              <span className='hidden sm:block'>Friends</span>
            </Link>
          </li>
          <li className='p-2 rounded-lg pointer bg-[rgba(255,255,255,.2)] '>
            <Link className="flex justify-center gap-2  items-center">
              <i className="fa-regular fa-file fa-fw"></i>
              <span className='hidden sm:block'>Files</span>
            </Link>
          </li>
          <li className='p-2 rounded-lg pointer bg-[rgba(255,255,255,.2)] '>
            <Link className="flex gap-2 justify-center  items-center" >
              <i class="fa-regular fa-credit-card fa-fw"></i>
              <span className='hidden sm:block'>Plans</span>
            </Link>
          </li>
        </ul>
        </div>
    </div>
  )
}

export default SideBar