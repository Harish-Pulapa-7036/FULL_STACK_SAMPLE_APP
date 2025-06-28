const express=require('express');
const mongoose = require('mongoose');
const cors=require('cors');


const app=express();
app.use(express.json())
app.use(cors())

async function connectDb(){
    try{
 await mongoose.connect('mongodb+srv://harishkarthik7036:kDPHWcpkPhrxwJFu@cluster0.lixoulb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
console.log('connected');

    }catch(e){
        console.log(e)
    }
}
connectDb();
app.use("/api/auth", require("./routes/authroutes"));


app.listen(3000,()=>{
    console.log('running on 3000');
})