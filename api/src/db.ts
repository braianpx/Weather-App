import mongoose from 'mongoose';
require('dotenv').config();

export default async function connectDB () {
    try{
    const db = await mongoose.connect('mongodb://localhost:27017/wheater-app')
    console.log('database is connected to', db.connection.db.databaseName)
    }catch(error){
    console.log(error)
    }
};



