import {Response, Request} from 'express';
import UserModel, { User } from '../../models/User';
import FavoritesModels from '../../models/Favorites';
import jwt from 'jsonwebtoken';
import { DocumentType } from '@typegoose/typegoose';

export const signUp = async (req:Request,res:Response) => {
  const username:string = req.body.username as string;
  const password:string = req.body.password as string;
  try{
    if(!username && !password) 
      return res.status(400).send('username and password is required');
    const usernameExist:DocumentType<User> | null = await UserModel.findOne({username:username});
    if(usernameExist)
      return res.status(401).send('User already exist');
    
    const user:DocumentType<User> | null = await UserModel.create({username:username,password:password});
    await FavoritesModels.create({user:user._id});
    return res.status(201).send('User Created');
  }catch(err:any){
    return res.status(500).json({data:err.message});
  }
};

export const signIn = async (req:Request,res:Response) =>{
  const username:string = req.body.username as string;
  const password:string = req.body.password as string;
  try{
    if(!username && !password) 
      return res.status(404).json({data:'username and password is required'});

    const user: DocumentType<User> | null  = await UserModel.findOne({username:username});
    const passwordCorrect: boolean | null  = user === null ? false : await user.comparePassword(password);
    if (!(user && passwordCorrect)) 
      return res.status(401).json({data: "invalid user or password"});
    const userForToken:object = {
      id: user._id,
      username: user.username
    };
    const token:string = jwt.sign(userForToken, process.env.SECRETJWT as string, {
      expiresIn: 60 * 60 * 24 * 7 
    });
    return res.json({token:token, username:username});
}catch(err:any){
    return res.status(500).json({data:err.message})
}};

export const deleteAccount = async (req:Request,res:Response) => {
const user = req.user;
try{
    if(!user)
      return res.status(404).json({data:'User not found'})
    const deleteUser = await UserModel.deleteOne(user);
    if(!deleteUser.acknowledged) 
      return res.status(404).json({data:'unexpected error'});
    
    await FavoritesModels.deleteOne({user:user});
    return res.status(200).json({data:'User deleted successfully'});
}catch(err:any){
    return res.status(500).json({data:err.message});
}};