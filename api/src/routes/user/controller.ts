import {Response, Request} from 'express';
import UserModel from '../../models/User';
import FavoritesModels from '../../models/Favorites';
import jwt from 'jsonwebtoken';

////// post signUp ///////

export const signUp = async (req:Request,res:Response) => {
const username:string = req.body.username;
const password:string = req.body.password;
try{
    let switchIfOne = true;
    if(username && password){
        const usernameExist = await UserModel.findOne({username:username})
        if(usernameExist === null){
            const user = await UserModel.create({username:username,password:password})
            await FavoritesModels.create({user:user._id})
             res.status(201).send('User Created')
        }else{
            switchIfOne = false;
             res.status(401).send('User already exist')
        }
    }
    else if(switchIfOne){
        res.status(401).send('missing data required')
    }
}catch(err){
    res.status(401).json({data:err+''})
}
};


////// Post SignIn ////////////

export const signIn = async (req:Request,res:Response) =>{
const username:string = req.body.username;
const password:string = req.body.password;
try{
    if(!username && !password){
        res.status(404).json({data:'username and password is required'})    
        return;
    }else{
        const user = await UserModel.findOne({username:username})
        const passwordCorrect = user === null ? false : await user.comparePassword(password);
    if (!(user && passwordCorrect)) {
        res.status(401).json({data: "invalid user or password"});
        return;
      }else{

        const userForToken = {
          id: user._id,
          username: user.username
        };

        const token = jwt.sign(userForToken, String(process.env.SECRETJWT), {
          expiresIn: 60 * 60 * 24 * 7 
        });

        res.json({token:token, username:username});
    }
}
}catch(err){
res.status(401).json({data:err + ''})
}
};


export const deleteAccount = async (req:Request,res:Response) => {
const user = req.user;
try{
    const deleteUser = await UserModel.deleteOne(user)
   if(deleteUser.acknowledged){
    await FavoritesModels.deleteOne({user:user})
    res.status(200).json({data:'User deleted successfully'})
}
   else res.status(404).json({data:'unexpected error'})
}catch(err){
    res.status(404).json({data:err+''})
}
}