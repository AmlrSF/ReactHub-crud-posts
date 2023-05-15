import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import FileSaver from 'file-saver';
import DisplayData from '../compounts/DisplayData';
const SinglePost = () => {
  const [SinglePost, setSinglePost] = useState([]);
  const [searchQuery,setsearchQuery] = useState('');
  const [posts,setPost] = useState(null)
  const [searcheddata,setsearcheddata] = useState(null);

  const handelsearch = (e)=>setsearchQuery(e.target.value);

  let {id} = useParams();
  const handeldownload  = (_id, image) =>{
    FileSaver.saveAs(image, `download-${_id}.jpg`);
  }

  useState(()=>{
    
  })

  useEffect(()=>{
    const fetchSinglePost  = async ()=>{
      try {
        const response = await fetch(`http://localhost:3000/api/v1/posts/${id}`);
        const data = await response.json();
        let objDate =  data.date;
        
        setSinglePost(objDate);
        
      } catch (error) {
        console.log(error);
      }
    }
    const getReatedposts = async()=>{
      try {
        const response = await fetch(`http://localhost:3000/api/v1/posts/Relatedposts/${SinglePost[0]?.author}`);
        const data = await response.json();
        let objDate =  data.date;
        console.log(`${SinglePost[0]?.author}`);
        setPost(objDate);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSinglePost();
    getReatedposts();
    
  },[]);
  
  const searchPosts = ()=>{
    const searchItems = posts.filter((post)=>{
      return post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.description.toLowerCase().includes(searchQuery.toLowerCase())||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) 
    })
    
    setsearcheddata(searchItems)
  }
  

  return (
    <section className='max-7xl mx-auto sm:px-8 px-4 py-8 
    bg-[#f9fafe] min-h-[calc(100vh-64.4px)]'>
        <div className='h-full flex gap-5'>
            <img 
              className="img cursor-pointer h-[250px]"  
                src={SinglePost[0]?.image}
            />
          <div className='flex flex-col'>
          <h1 className='text-[#6469ff] underline text-[28px]'>
              
            </h1>
            <h1 className='text-[28px]'>
              {SinglePost[0]?.title}
            </h1>
            <p className='text-grey'>
            {SinglePost[0]?.description}
            </p>
            <p className=' mt-5 text-grey'>
            {SinglePost[0]?.date}
            </p>

            <button  className=" text-white bg-green-700 font-medium
            rounded-md text-sm mt-5 sm:w-[120px] w-full
              px-5 py-2.5 text-center" onClick={()=>handeldownload(_id,image)}>
              download 
            </button>
          </div>
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

export default SinglePost