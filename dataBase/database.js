
const express=require('express');

let router=express.Router();

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2/'; 
const databaseName = 'school'; 


async function Connection(){
    const client = new MongoClient(uri);
    await client.connect();  
    const db = client.db(databaseName);
    console.log(`Connected to MongoDB: ${databaseName}`);
    const collection = db.collection("Students");
    return collection;
}


async function FindById(id) {
    collection=Connection();
    const result1 = await collection.find({ _id: new ObjectId(id)}).toArray();
    client.close();
    return result1;
}

async function GetLimit(limit) {
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
}


async function AddUser(name,age,edu){
    const client = new MongoClient(uri);
    await client.connect();  
    const db = client.db(databaseName);
    
    const collection = db.collection("Students");
    const result1 = await collection.insertOne({ Name:name,age:age,Edu:edu});
    
    client.close();

}


module.exports={FindById,GetLimit,AddUser};

