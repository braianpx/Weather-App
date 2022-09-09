// import bcrypt from "bcryptjs";
import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {

    @prop({type:String, unique:true, trim:true, required:true})
    username:string

    @prop({type:String, required:true, minlength:7})
    password:string

    // encryptPassword(password:string){
    //     bcrypt

    // }
}

const UserModel = getModelForClass(User);
export default UserModel;