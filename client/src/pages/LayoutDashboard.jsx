import React from 'react'
import {Route,Routes} from 'react-router-dom';
import { SideBar } from '../compounts/index';
import {Settings,Profile, Dashboard,CreatePost} from './index';

const LayoutDashboard = () => {
  return (
    <div className='w-[100%]  flex h-[100%]'>
      <SideBar />
      <div className='flex-1'>
        <Routes>
          <Route path='/'  element={<Dashboard />}/>
          <Route path='/Profile'  element={<Profile />} />
          <Route path='/Settings' element={<Settings />} />
          <Route path='/CreatePost' element={<CreatePost />} />
        </Routes>
        </div>
    </div>
  )
}



export default LayoutDashboard