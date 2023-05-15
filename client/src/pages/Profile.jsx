import React, { useState } from 'react'
import { useContext } from 'react';
import { userContext } from '../context/context';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const {
    setUser,user,
    setemail,email,
    setpass,pass,
    setid,id
  }  = useContext(userContext);
  const [PrivatePass,setPrivatePass] = useState(false);
  const navigate = useNavigate();
  const GotoSetting = ()=>{
    console.log('hello');
    return navigate('/Dashboard/Settings')
  }
  return (
    <div className='sm:p-5 p-2 w-full h-full'>
      <h1 className='underline text-[#6469ff]  text-[28px] mb-5'>Profile</h1>
      <div className='bg-[#6469ff] sm:p-5 rounded-md p-2'>
        <ul className='flex flex-col gap-3'>
          <li>
              <h2 className='text-[22px] text-white'>
                username
              </h2>
              <div className='flex items-center gap-5'>
                <i className="text-white fa-solid fa-arrow-right"></i>
                <span className='text-gray text-[16px] bold'>
                  {user}
                </span>
              </div>
          </li>
          <li>
              <h2 className='text-[22px] text-white'>
                Email
              </h2>
              <div className='flex items-center gap-5'>
                <i className="text-white fa-solid fa-arrow-right"></i>
                <span className='text-gray text-[16px] bold'>
                  {email}
                </span>
              </div>
          </li>
          <li>
              <h2 className='text-[22px] text-white'>
                Id User
              </h2>
              <div className='flex items-center gap-5'>
                <i className="text-white fa-solid fa-arrow-right"></i>
                <span className='text-gray text-[16px] bold'>
                  {id}
                </span>
              </div>
          </li>
          <li>
              <h2 className='text-[22px] text-white'>
                hashed Password
              </h2>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                  <i className="text-white fa-solid fa-arrow-right"></i>
                  <span className='text-gray text-[10px] bold'>
                    {PrivatePass ? pass: '*************' }
                  </span>
                </div>
              <div onClick={()=>setPrivatePass(!PrivatePass)} className='bg-white p-2  rounded-[5px]'>
                  {PrivatePass ? 
                    <i class="fa-solid text-[#6469ff] fa-eye"></i>
                    :
                    <i class="fa-solid text-[#6469ff] fa-eye-slash"></i>
                  }
                </div>
              </div>
          </li>
        </ul>
      </div>
      <button className='text-white 
      font-medium bg-[#6469ff] font-medium
                rounded-md mt-5 text-sm 
                w-full sm:w-auto
                  px-5 py-2.5 text-center'
                  onClick={GotoSetting}
          >
        Edit Your profile
      </button>
    </div>
  )
}

export default Profile