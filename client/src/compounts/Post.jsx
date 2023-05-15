import React from 'react'
import FileSaver from 'file-saver';

import { useNavigate } from 'react-router-dom';
import download from '../previewImage/download.png'

const Post = ({ _id, title,image,author, description,date}) => {
  const handeldownload  = (_id, image) =>{
    FileSaver.saveAs(image, `download-${_id}.jpg`);
  }
 

  const navigate = useNavigate();
  const handelRoute = () => navigate(`/post/${_id}`);
  return (
    <div className='post rounded-md' >
        <img 
            className="img cursor-pointer"  onClick={handelRoute}
            src={image}
        />
        <div className='post-info  bg-[#6469ff] flex justify-center items-center'>
            <div>
                <h3 className='text-white'>{author}</h3>
                <p className='mt-[-10px] text-white'>{date}</p>
                <p className='mt-2 text-white'>{title}</p>
            </div>

            <img onClick={()=>handeldownload(_id,image)} src={download} alt="" />
        </div>
    </div>
  )
}

export default Post