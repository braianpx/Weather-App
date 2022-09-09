import {Response, Request} from 'express';
import UserModel from '../../models/User';
import FavoritesModels from '../../models/Favorites';

export const CreateUser = async (req:Request,res:Response) => {
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
    res.status(401).json({data:err})
}
};

