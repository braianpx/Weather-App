import mongoose from 'mongoose';
require('dotenv').config();
const { PORT, DB, NAMEDB } = process.env; 
export default async function connectDB(){
    try{
        const db = await mongoose.connect(`mongodb://${DB}:${PORT}/${NAMEDB}`);
        console.log('database is connected to', db.connection.db.databaseName);
    }catch(error:any){
        console.log(error.message);
    }
}


