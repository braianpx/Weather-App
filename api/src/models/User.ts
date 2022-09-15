import { prop, getModelForClass, pre, DocumentType } from '@typegoose/typegoose';
import bcrypt from "bcryptjs";
const { SALT_ROUNDS } = process.env;


@pre<User>('save', function (next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,Number(SALT_ROUNDS),(err: Error, hash:string)=>{
            if(err) next(err);
            else{ 
                this.password = hash;
                next();
            };
        });
    }else{
        next()
    };
})

export class User {

    @prop({type:String, unique:true, trim:true, required:true})
    username:string

    @prop({type:String, required:true, minlength:7})
    password:string

    comparePassword(this: DocumentType <User> , password:string){
    return bcrypt.compare(password,this.password)
    }
}



const UserModel = getModelForClass(User);
export default UserModel;