import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

import DisplayData from '../compounts/DisplayData';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery,setsearchQuery] = useState('');
  const [posts,setPost] = useState(null)
  const [searcheddata,setsearcheddata] = useState(null);

  const handelsearch = (e)=>setsearchQuery(e.target.value);
  useEffect(()=>{
    const getPosts = async()=>{
      try {
        const response = await fetch('http://localhost:3000/api/v1/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPost(data.posts.reverse());
        }
      } catch (error) {
        console.log(error);
      }
    
    }

    getPosts();
  },[])
  const searchPosts = ()=>{
    const searchItems = posts.filter((post)=>{
      return post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.description.toLowerCase().includes(searchQuery.toLowerCase())||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) 
    })
    console.log(searchItems)
    setsearcheddata(searchItems)
  }
  return (
    <section className='max-7xl mx-auto sm:px-8 px-4 py-8 
     bg-[#f9fafe] min-h-[calc(100vh-64.4px)]'>
        <div className='h-full flex itmes-center flex-col'>
          <h1 className="font-extrabold text-[#6469ff] text-[32px]">
            Welcome to  <br/>
            Our Company
            </h1>
            <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
            Our company is dedicated to providing high-quality products and exceptional services to our customers. With years of experience in the industry, we strive to exceed customer expectations and deliver innovative solutions.
            </p>
          <h3 className='text-[18px] text-['>Login to post memes and more on our website.</h3>
            <button onClick={()=>navigate('/Login')} className=" text-white bg-green-700 font-medium
            rounded-md text-sm mt-5 sm:w-[120px] w-full
              px-5 py-2.5 text-center">
              Log in 
            </button>

        </div>
      <div className='mt-10 ' >
        <div>
          <label htmlFor="post">Search for posts</label>
          <div className='flex gap-2'>
          <input
          style={{display:'block'}}
            type='text'
            className="bg-gray-50 
            border border-gray-300  text-gray-900
            text-sm rounded-lg focus:ring-[#6469ff] 
            focus:border-[#6469ff] 
            outline-none block w-[100%] sm:w-[250px]  p-3 "
            placeholder='search for post'
            value={searchQuery}
            onChange={handelsearch}
            required
          />
           <button className=' text-white bg-green-700 font-medium
           rounded-md text-sm   
             px-5 py-2.5 text-center' onClick={searchPosts}>Search</button>
          </div>
           {searchQuery && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#222328]">{searchQuery}</span>:
              </h2>
            )}
            <div className='container-data mt-5'>
            {
              searchQuery  ?(
                <DisplayData 
                  data={searcheddata}
                  title="No Search Results Found"
                />
              ):(
                <DisplayData 
                data={posts}
                title="No Posts Yet"
              />
              )
            }
            </div>
           

        </div>
      </div>
    </section>
  )
}

export default Home