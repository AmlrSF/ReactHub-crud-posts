const express = require('express');
const app = express();
const cors = require('cors');
const user = require('./routes/route');
const post = require('./routes/route1')
const connectDB = require('./mongodb/connect');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
//in order to access to the envirement variables
require('dotenv').config();

//middleware
app.use(express.json({limit:'50mb'}));
app.use(cors());
app.use('/api/v1/users',user);
app.use('/api/v1/posts',post);
app.use(cookieParser())


const port = 3000;
const {MONGODB_URL,MNGO_USERS_URL} = process.env;

const start = async (port,url,ur1)=>{
    try{
        await connectDB(url);
        const postsDBConnection = mongoose.createConnection(ur1, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }).on('error',(err)=>console.log(err))
        .once('open', () => {
            console.log('Connected to posts database');
        });


        app.listen(port, console.log(`server running on port ${3000}..../`))
    }catch (err){
        console.log(err);
    }
}

start(port,MONGODB_URL,MNGO_USERS_URL)
