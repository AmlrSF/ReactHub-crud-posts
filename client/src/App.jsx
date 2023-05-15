import React from 'react';
import { Header,Footer,Wrapper } from './compounts/index';

import { Home,About,Contact,Login,SignUp,LayoutDashboard } from './pages/index';

import {Routes , Route} from 'react-router-dom';
import {UserContextProvider} from '../src/context/context';
import SinglePost from './pages/SinglePost';
function App() {
  
  return (
    <>
      <UserContextProvider>
        <Header />
        <Wrapper>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/Dashboard/*' element={<LayoutDashboard/>}/>
            <Route path='/About' element={<About />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route  path='/post/:id' element={<SinglePost />}/>
          </Routes>
        </Wrapper>
        <Footer />
      </UserContextProvider>
    </>
  )
}

export default App
