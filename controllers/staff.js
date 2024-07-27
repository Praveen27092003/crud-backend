const express = require("express");
const router = express.Router();



router.get('/staffList', (req, res) => {

    let staffArray = [
        {
            id:1,
            name:'sam',
            age:20
        },
         {
            id:2,
            name:'vishal',
            age:21
        }
    ];
    res.send({status:1,data:staffArray})
  })

  router.post('/addStudent', (req, res) => {
    console.log("-----------",req.body);
    let Firstname = req.body.fistname
    let Lastname = req.body.lastname
    let Age = req.body.age
    let Email = req.body.email
  //   let EmailFormat =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //   if(Firstname && Lastname && Age && Email){

    

  //   if(EmailFormat.test(Email) ){
  //     // res.send({status:1,message:'Email is added'})
      
  //     res.send({status:1,message:"student registered successful",id:101})
     
  //   }
  //   else{
  //     res.send({status:0,message:'Enter the valid email'})
      

  //   }
   

  // }
  // else{

  // }

  console.log("------Email-----",Email);
      console.log("-----Firstname------",Firstname);
      console.log("------Lastname-----",Lastname);
      console.log("-----Age------",Age);
    res.send({status:0,message:"student registered unsuccessful"})

    
    
    
  })
  module.exports = router