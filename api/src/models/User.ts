// import bcrypt from "bcryptjs";
import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {

    @prop({type:String, unique:true, trim:true, required:true})
    username:string

    @prop({type:String, unique:true, required:true, minlength:8})
    password:string

    // encryptPassword(password:string){
    //     bcrypt

    // }
}

const UserModel = getModelForClass(User);
export default UserModel;