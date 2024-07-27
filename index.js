





/////////////////////////////////////////////////task/////////////////////////////////////////////////////////////////////////

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv').config()




const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 8080

//Schema
const schemaData = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    mobile : Number,
    password : String,
    confirmPassword : String,
    image:String
},{
    timestamps : true
})

const userModel = mongoose.model("user",schemaData)


//read
//​http://localhost:8080/
app.get("/",async(req,res)=>{
    const data = await userModel.find({})

    res.json({success : true , data : data})
})

//create data // save data in mongodb

//​http://localhost:8080/create
/*{
    firstName,
    lastName,
    email,
    mobile,
    password,
    confirmPassword,
    image
}*/

app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()

    res.send({success : true , message : "data save succesfully", data : data})
})

///update
//​http://localhost:8080/update
/* 
{
    id : " ",
    firstName : " ",
    lastName : "",
    email : " ",
    mobile : " ",
    password : " ",
    confirmPassword : "",
    image : ""

}
*/

app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {id,...rest} = req.body
    console.log(rest)
    const data = await userModel.updateOne({_id : id},rest)

    res.send({success : true, message : "data updated succesfully", data : data})
})

//Delete api
//​http://localhost:8080/delete/id

app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true, message : "data deleted succesfully", data : data})


})



mongoose.connect(process.env.MONGO_URL)
.then(()=>{
        console.log("connect to DB")
app.listen(PORT,()=>console.log("Server is running"))

    })
.catch((err)=>console.log(err))


// mongodb://localhost:27017/crudoperation



