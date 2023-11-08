const express=require('express');
let router=express.Router();
var cookieParser = require('cookie-parser');  

router.use(cookieParser());   
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2/'; 
const databaseName = 'school'; 
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
    console.log(id);
    const client = new MongoClient(uri);
    await client.connect();  
    const db = client.db(databaseName);
    console.log(`Connected to MongoDB: ${databaseName}`);
    const collection = db.collection("Students");
    const result1 = await collection.find({ _id: new ObjectId(id)}).toArray();
    
    client.close();
    res.json(result1);
});

router
.route('/findbylimit')
.get(async (req, res)=>{  
    var limit = req.query.limit;
    if(limit=='0'){
        limit=10;
    }
    limit=parseInt(limit);
    
    const client = new MongoClient(uri);
    await client.connect();  
    const db = client.db(databaseName);
    console.log(`Connected to MongoDB: ${databaseName}`);
    const collection = db.collection("Students");
    const result1 = await collection.find().limit(limit).toArray();
    client.close();
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
    
    const client = new MongoClient(uri);
    await client.connect();  
    const db = client.db(databaseName);
    
    const collection = db.collection("Students");
    const result1 = await collection.insertOne({ Name:req.body.username,age:req.body.userage,Edu:req.body.userEdu});
    
    client.close();

    res.send(200);
  });


  


module.exports=router;



// router.set('view engine', 'ejs');
// router.set('views', './views');

// router
// .route('/adduser')
// .get((req,res)=>{
//     res.render('form');
// });
