const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' });
const StudentModel = require('../studentschema');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix +'.jpg')
  }
})

const upload = multer({ storage: storage })


//////////////////GET////////////////////////////////////////////////
router.get('/studentsList', async (req, res) => {
  

  const users = await StudentModel.find({});
  res.send({success : true ,data : users})
  })

  router.get('/studentsList1/:id',  (req, res) => {

    const id = req.params.id
    console.log(id)
     StudentModel.findById({_id : id})
      .then(post => res.json(post))
      .catch(err => console.log(err))
    // res.send({success : true ,data : data})
    })

///////////////////////update/////////////////////////////////////
//   router.put("/update",async(req,res)=>{
//     console.log(req.body)
//     const {id,...rest} = req.body
//     console.log(rest)
//     const data = await StudentModel.updateOne({_id : id},rest)

//     res.send({success : true, message : "data updated succesfully", data : data})
// })

router.put('/update/:id', async (req, res) => {

  const id = req.params.id;
  

  // Find the document by ID and update
  const updatedData = await StudentModel.findByIdAndUpdate({_id: id}, {
    firstName:req.body.firstName,
    email:req.body.email,
    phone:req.body.phone
    });
  res.send({success : true, message : "data updated succesfully", data : updatedData})
  
});

  /////////////////////POST///////////////////////////////

  router.post('/addStudent',upload.single('image'), async (req, res) => {
    console.log("---req.file----",req.file);
   const saltRounds = 10;
   const myPlaintextPassword = req.body.pwd;
   const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
   const newStudent = new StudentModel();
   newStudent.firstName = req.body.firstName;
   newStudent.phone = req.body.phone;
   newStudent.email = req.body.email;
   newStudent.pwd = hash;
   newStudent.image = req.body.image;

   const result = await newStudent.save();

   if(result){
    res.send({status:1,message:"successfull",id:result._id});
   }
   else{
    res.send({status:0,message:"unsuccessfull"});
   }


   console.log("----result--",result);
  })
/////////////////////////DELETE/////////////////////////////////////////////////

router.delete("/delete/:id",async(req,res)=>{
  const id = req.params.id
  console.log(id)
  const data = await StudentModel.deleteOne({_id : id})
  res.send({success : true, message : "data deleted succesfully", data : data})

})

  //   let EmailFormat =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{ 2,3})+$/;
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
  // console.log("------Email-----",Email);
  //     console.log("-----Firstname------",Firstname);
  //     console.log("------Lastname-----",Lastname);
  //     console.log("-----Age------",Age);
  //   res.send({status:0,message:"student registered unsuccessful"})


  router.post('/login', async (req, res) => {

  const email = req.body.email;
  const password = req.body.pwd;
  const isEmailExist = await StudentModel.findOne({email:email});
  console.log("--isEmailExist------",isEmailExist);
  if(isEmailExist == null){
    res.send({status:0,message:"unsuccessfull Email Does not Exits"});
   }
   else{
    const dbPassword = isEmailExist.pwd;
    if(bcrypt.compareSync(password, dbPassword)){
    res.send({status:1, success : true,message:" login successfull",data : isEmailExist});
    }else{
    res.send({status:0,success : false,message:" invalid password"});

    }
   }
   })
  module.exports = router;