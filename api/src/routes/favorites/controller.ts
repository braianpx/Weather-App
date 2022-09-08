import {Response, Request} from 'express';
import FavoritesModels from '../../models/Favorites';

///// Post Favorite ////

export const createFavorite = async (req:Request ,res:Response) =>{
const idUser:string = req.body.idUser;
try{
    if(idUser){
        await FavoritesModels.create({user:idUser})
        res.status(201).json({data:'Favorites created successfully'})
    }
    res.status(401).json({data:'Failed to create favorites'})
}catch(err){
    res.status(401).json({data:err})
}


}

/////// Put ////////
export const addFavorites = async (req:Request ,res:Response) =>{
    const idUser:string = req.body.idUser;
    // const city:string = req.body.city;
    try{
        if(idUser) {
            const favorite = await FavoritesModels.findOne({user:idUser})
            console.log(favorite)
            // favorite.favorites.push(city)
             // await FavoritesModels.updateOne({user:idUser},{favorites:favorite.favorites})
            res.status(204).json({data:'successfully add'})
        }
        res.status(404).json({data:'unexpected error'})
    }catch(err){
        res.status(404).json({data:err+''})
    }
} ;

export const removeFavorites = async (req:Request ,res:Response) =>{
    const idUser:string = req.body.idUser;
    // const city:string = req.body.city;
    try{
        if(idUser) {
            const favorite = await FavoritesModels.findOne({user:idUser})
            console.log(favorite)
            // const arrayFavorites:string[] = favorite.favorites.filter(el => el !== city)
            // await FavoritesModels.updateOne({user:idUser},{favorites:arrayFavorites})
            res.status(204).json({data:'successfully deleted'})
        }
        res.status(404).json({data:'unexpected error'})
    }catch(err){
        res.status(404).json({data:err+''})
    }
} ;




///////// delete ///////////
export const deleteFavorites = async (req:Request ,res:Response) =>{
const idUser:string = req.body.idUser;
    try{
        await FavoritesModels.deleteOne({user:idUser}) 
        res.status(204).json({data:'successfully deleted'})
}catch(err){
    res.status(404).json({data:err+''})
};
} 





/////////// get //////////

export const getFavorites = async (req:Request ,res:Response) =>{

const idUser: string= req.body.idUser;
try{
    if(idUser){
    const favorites = await FavoritesModels.findOne({user:idUser},{favorites:1, _id:0});
    res.status(200).json({data:favorites})
    }
    res.status(404).json({data:"No favorites found"})
}catch(err){
    res.status(404).json({data:err +''})
}

 } 


