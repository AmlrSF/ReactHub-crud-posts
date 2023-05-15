const {validationResult}  = require('express-validator');
const user = require("../schema/index");
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('../routes/route');
require('dotenv').config();

const register = async(req,res)=>{
    let {password,username,email} = req.body;
   try {
    const resErorrs = validationResult(req); 
    if(!resErorrs.isEmpty()){
        return res.status(400).json({
            errors:resErorrs.array()
        })
    }

    const userMatch = await user.findOne({email});
    if(userMatch){
        return res.status(400).send({
            "errors": [
                    {
                        "type": "email",
                        "value":email,
                        "msg": "this user already exists",
                    }
            ]
            
        })
    }

    const saltRounds = 10;
    const hashedpass = await bycrpt.hash(password, saltRounds)

    const servedUser = await user.create({
        username,
        email,
        password:hashedpass
    })

    const token =  jwt.sign({
        email
    },process.env.SECRET_CODE,{
        expiresIn: new Date().getTime() + 36000000
    });

     res.status(201).json({token});
   } catch (error) {
    res.status(500).json({"msg":"internal server error"});
   }

}

const Login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        let MatchUser = await user.findOne({email}); 

        if(!MatchUser) return res.status(400).send({
            "errors": [
                    {
                        "type": "email",
                        "value":email,
                        "msg": "sry, there no user by this credentials",
                    }
            ]
        })
        let Matched =  await bycrpt.compare(password,MatchUser.password);
        if(!Matched){ return res.status(400).send({
            "errors": [
                    {
                        "type": "password",
                        "value":password,
                        "msg": "invalid Password",
                    }
            ]
        })}else{
            const token =  jwt.sign({
                email
            },process.env.SECRET_CODE,{
                expiresIn:new Date().getTime() + 36000000,
                
            });
            res.json({success:true,token,user:MatchUser.username,Matched});
        }
    } catch (error) {
        res.status(500).json({"msg":"internal server error"});
    }
}

const getAllUsers = async(req,res)=>{
    try {
        const users = await user.find({});
        if(!users) return res.status(200).json({success:true,msg:"there no users in database"});
        return  res.status(200).json({success:true,users});
    } catch (error) {
        res.status(500).json({"msg":"internal server error"});
    }
}

const getUser = async(req,res)=>{
    let {email} = req.body;
   try {
        const userInfo = await user.findOne({email});
        console.log(userInfo);
        res.json({logged:true,userInfo});

   } catch (error) {
    console.log(error);
   }
}

const updateUserInfo = async(req,res)=>{
    let {newEmail,newUser,password,oldemail} = req.body;
    let {id} = req.params;
    

    const update = {
        username: newUser,
        email : newEmail,
     };

     console.log(req.body);
   
    try {
        let MatchUser = await user.findOne({email:oldemail}); 
        
        let Matched = await bycrpt.compare(password,MatchUser.password);
        console.log(Matched);
        if(!Matched) return res.status(400).send({
            success:false,
            msg: "invalid Password",
        })
        const updatedUser = await user.findOneAndUpdate({_id:id}, update);
        res.status(200).json({succes:true,msg:'the user is edited succesfully',updatedUser});
        console.log(updatedUser);
        
        
    }catch  (error) {
        res.status(400).json({succes:false,msg:'internal server error'});
    }
}

module.exports = {
    register,
    Login,
    getAllUsers,
    getUser,
    updateUserInfo
}
