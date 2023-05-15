import React, { useState ,useEffect} from 'react'
import { useContext } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { userContext } from '../context/context';

const Header = () => {
  const navigate = useNavigate();
  
  const {setUser,user,setemail,setpass,setid} = useContext(userContext);

  useEffect(()=>{
    const PostToken = async ()=>{
      try {
          let Grabtoken = localStorage.getItem('token');
          await fetch('http://localhost:3000/api/v1/users/profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({Grabtoken}),
          }).then(
            data=>data.json()
          ).then(
            res=>{
              if(res.errors) return  navigate('/Login')
              // console.log(res);
              let {username,_id,password,email} = res.userInfo;
              setUser(username);
              setemail(email);
              setpass(password);
              setid(_id);
            }
          )
          
        } catch (error) {
          console.log(error);
        }
    }

    PostToken();
  },[]);

  const logout = ()=>{
    localStorage.clear();
    setUser('');
    navigate('/Login');
  }
  return (
    <header 
      className='flex justify-between items-center
      bg-white sm:px-8 px-4 py-4 border border-b border-b-[#e6ebf4]'>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-5 w-full'>
          <ul className='list-none flex items-center justify-between  gap-1.5'>
            <Link to='/' className='text-[23px] font-bold text-[#6469ff]'>Dashboard</Link>
            <Link to='/About' className='text-gray-500'>About</Link>
            <Link to='/Contact' className='text-gray-500'>contact</Link>
          </ul>
          <div className='flex gap-2'>
            {user ? 
              <>
              <button onClick={()=>navigate('/Dashboard')} 
                className=" text-white font-medium bg-[#6469ff] font-medium
                rounded-md text-sm  
                  px-5 py-2.5 text-center">
                  {user}
                </button>
                <button onClick={()=>logout()} 
                className=" text-white font-medium bg-[#6469ff] font-medium
                rounded-md text-sm  
                  px-5 py-2.5 text-center">
                  Logout 
              </button>
              </>
            : 
              <>
                <button onClick={()=>navigate('/SignUp')} 
                className=" text-white font-medium bg-[#6469ff] font-medium
                rounded-md text-sm  
                  px-5 py-2.5 text-center">
                  Sign Up
                </button>
                <button onClick={()=>navigate('/Login')} 
                className=" text-white font-medium bg-[#6469ff] font-medium
                rounded-md text-sm  
                  px-5 py-2.5 text-center">
                  Login 
                </button>
              </>
            }
          </div>
        </div>
      </header>
  )
}

export default Header