const express=require('express');
let router=express.Router();
var cookieParser = require('cookie-parser');  

router.use(cookieParser());   
const db1=require('../dataBase/database.js')

router.use(express.urlencoded({ extended: true }));



router.use(function(req,res,next){
    console.log(req.url+" @ "+Date.now());
    next();
})


router
.route('/findbyId')
.get(async (req,res)=>{
    var id = req.query.id;
    if(id !== undefined && id !== null && id !== ""){
        test=await db1.FindById(id);
        res.json(test);
    }else{
        res.send(403)
    }
    
});

router
.route('/findbylimit')
.get(async (req, res)=>{  
    var limit = req.query.limit;
    result1= await db1.GetLimit(limit);
    res.json(result1); 
    
});  

router
.route('/storedata')
.post((req, res)=>{  
    res.send('Cookie1 is set');  
});  

router
  .route('/adduser')
  .get((req,res)=>{
      res.render('form');
      
  }).post(async (req,res)=>{

    if((req.body.username !== undefined && req.body.username !== null && req.body.username !== "") && 
    (req.body.userage !== undefined && req.body.userage !== null && req.body.userage !== "") &&
    (req.body.userEdu !== undefined && req.body.userEdu !== null && req.body.userEdu !== "") ) {
   
        result1=await db1.AddUser(req.body.username,req.body.userage,req.body.userEdu);
        if(result1.acknowledged){
        res.send(200);
        }else{
        res.send(403);
        }
    } else {
        res.send(403);
    }

    
    
  });


  


module.exports=router;



