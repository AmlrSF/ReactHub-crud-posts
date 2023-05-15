import React, { useContext, useState } from 'react'
import { userContext } from '../context/context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Settings = () => {

  const {user,email,id,pass,setUser,setemail} = useContext(userContext);
  
  const navigate = useNavigate();
  const [infoEdit,setinfoEdit] = useState({
    newEmail:'',newUser:'',
  })
  const [olduser,setolduser] = useState('');
  const [oldemail,setoldemail] = useState('');
  const [password,setPass] = useState('');
  const handleSubmit = async(e)=>{
    e.preventDefault();
    let {newEmail,newUser} = infoEdit;
    if(!(olduser === user)) return toast.error('please enter your old username', {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    
    if(!(oldemail === email)) return toast.error('please enter your old email', {
      position: toast.POSITION.BOTTOM_RIGHT
    });

    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...infoEdit,oldemail,password})
      };
      const response = await fetch(`http://localhost:3000/api/v1/users/updateUser/${id}`, requestOptions);
      const data = await response.json();
      console.log(data);
      
        if(data.success == false){
          toast.error(data.msg, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }else{
          toast.success(data.msg, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          setTimeout(()=>{
            toast.success("You must login again !", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
            location = "http://127.0.0.1:5173/Login"
            localStorage.clear();
          },4000)
        }
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleUser = (e)=>setinfoEdit({...infoEdit,newUser:e.target.value});
  const handlEmail = (e)=>setinfoEdit({...infoEdit,newEmail:e.target.value});
  // const handlePass = (e)=>setinfoEdit({...infoEdit,pass:e.target.value});

  return (

    <>
      <ToastContainer />
      <div className='sm:p-5 p-2 w-full h-full'>
      <h1 className='underline text-[#6469ff]
        text-[28px] mb-5'>Settings</h1>
        <div className='mt-5   w-full  h-full'>
        <form className='w-auto sm:w-[400px]' onSubmit={handleSubmit}>
          <h1 className='text-center font-bold mb-7 text-[#6469ff] text-[30px]'>Register</h1>
          <label
            htmlFor='username'
            className="block text-md text-[#6569ff] font-medium text-gray-900">
            Old Username</label>
          <input
              type='text'
              id='username'
              name='username'
              className="bg-gray-50 mb-3
              border border-gray-300   text-gray-900
              text-sm rounded-lg focus:ring-[#6469ff] 
              focus:border-[#6469ff] 
              outline-none block w-[100%]   
              p-3"
              placeholder='old username'
              required
              value={olduser}
              onChange={(e)=>setolduser(e.target.value)}
            />
            <label
            htmlFor='email'
            className="block text-md text-[#6569ff] font-medium text-gray-900"
          >
            New Username
          </label>
          <input
              type='text'
              id='email'
              name='email'
              className="bg-gray-50 mb-3
              border border-gray-300  text-gray-900
              text-sm  rounded-lg focus:ring-[#6469ff] 
              focus:border-[#6469ff] 
              outline-none block w-[100%]   
              p-3"
              placeholder='New Username'
              required
              value={infoEdit.newUser}
              onChange={handleUser}
            />
            <label
            htmlFor='username'
            className="block text-[#6569ff]   text-md font-medium text-gray-900"
          >
            Old Email
          </label>
          <input
              type='text'
              id='username'
              name='username'
              className="bg-gray-50 mb-3
              border border-gray-300  text-gray-900
              text-sm rounded-lg focus:ring-[#6469ff] 
              focus:border-[#6469ff] 
              outline-none block w-[100%]   
              p-3"
              placeholder='Old Email'
              required
              value={oldemail}
              onChange={(e)=>setoldemail(e.target.value)}
            />
              <label
            htmlFor='username'
            className="block text-[#6569ff]   text-md font-medium text-gray-900"
          >
            new Email
          </label>
          <input
              type='text'
              id='username'
              name='username'
              className="bg-gray-50 mb-3
              border border-gray-300  text-gray-900
              text-sm rounded-lg focus:ring-[#6469ff] 
              focus:border-[#6469ff] 
              outline-none block w-[100%]   
              p-3"
              placeholder='New Email'
              required
              value={infoEdit.newEmail}
              onChange={handlEmail}
            />
                   <label
            htmlFor='username'
            className="block text-[#6569ff]   text-md font-medium text-gray-900"
          >
            Password
          </label>
          <input
              type='password'
              id='username'
              name='username'
              className="bg-gray-50 mb-3
              border border-gray-300  text-gray-900
              text-sm rounded-lg focus:ring-[#6469ff] 
              focus:border-[#6469ff] 
              outline-none block w-[100%]   
              p-3"
              placeholder='Pass'
              required
              onChange={(e)=>setPass(e.target.value)}
              value={password}
            />
              <input type='submit' 
            className=" text-white cursor-pointer  font-medium bg-[#6469ff] font-medium
            rounded-md text-sm w-full  
              px-5 py-2.5 text-center"
             value='Register'
            />
          </form>
          
        </div>
    </div>
    </>
  )
}

export default Settings