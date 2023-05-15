const post = require('../schema/index1');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// let {CLOUD_NAME,API_KEY,API_SECRET} = process.env;

// Configuration 
cloudinary.config({
    cloud_name: "dwsb4wnhn",
    api_key: "369441825263223",
    api_secret: "AwoR08f77vI5MgphE75z2jeYnC0"
});
  

const getusers = async (req,res)=>{
    try {
        const posts = await post.find({});
        if(!posts) return res.status(200).json({success:true,msg:"there no posts in database"});
        return  res.status(200).json({success:true,posts});
    } catch (error) {
        res.status(500).json({"msg":"internal server error"});
    }
}

const CreatePost = async (req,res)=>{
    let {title,description,photo,date,author} = req.body;
    try {
        
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newPost = await post.create(
            {
                title,
                description,
                date,
                description,
                author,
                image: photoUrl.url,
            }
        )
        console.log(newPost);
          res.status(200).json({ success: true, data: "post added successfully",newPost });

    } catch (error) {
        res.status(400).json({ success: false, data: "internal server issue" });
    }
}

const getSinglePost = async (req,res)=>{
    let {id} = req.params;
    try {
        const singlePost = await post.find({_id:id});
        console.log(id);
        res.status(200).send({sucess:true,date:singlePost});
    } catch (error) {
        res.status(200).send({sucess:false,msg:"internal server error"});
    }
}

const getRelatedPosts = async(req,res)=>{
    let {username} = req.params;
    console.log(username);
    try {
        const singlePost = await post.find({author:username});
        
        res.status(200).send({sucess:true,date:singlePost});
    } catch (error) {
        res.status(200).send({sucess:false,msg:"internal server error"});
    }
}

module.exports = {
    getusers,
    CreatePost,
    getRelatedPosts,
    getSinglePost,
}