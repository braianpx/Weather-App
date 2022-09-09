import {Response, Request} from 'express';
import FavoritesModels from '../../models/Favorites';


/////// Put ////////
export const addFavorites = async (req:Request ,res:Response) =>{
    const idUser:string = req.body.idUser;
    const city:string = req.body.city;
    try{
        if(idUser) {
            const favorite = await FavoritesModels.findOne({user:idUser})
            if(!favorite?.favorites.find(el => el === city)){
            favorite?.favorites.push(city)
             await FavoritesModels.updateOne({user:idUser},{favorites:favorite?.favorites})
            res.status(200).send('successfully add')
            }else if(favorite?.favorites.find(el => el === city)){
                res.status(404).json({data:'the city already exists in your favorites'})
            }
        }
        if(!idUser) res.status(404).json({data:'unexpected error'})
    }catch(err){
        res.status(404).json({data:err+''})
    }
};

export const removeFavorites = async (req:Request ,res:Response) =>{
    const idUser:string = req.body.idUser;
    const city:string = req.body.city;
    try{
        if(idUser) {
            const favorite = await FavoritesModels.findOne({user:idUser})
            const arrayFavorites = favorite?.favorites.filter(el => el !== city)
            await FavoritesModels.updateOne({user:idUser},{favorites:arrayFavorites})
            res.status(200).json({data:'successfully deleted'})
        }
        if(!idUser) res.status(404).json({data:'unexpected error'})
    }catch(err){
        res.status(404).json({data:err+''})
    }
} ;




///////// delete ///////////
export const deleteFavorites = async (req:Request ,res:Response) =>{
const idUser:string = req.body.idUser;
    try{
        await FavoritesModels.deleteOne({user:idUser}) 
        res.status(200).send('successfully deleted')
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
    res.status(200).json(favorites)
    }
    res.status(404).json({data:"No favorites found"})
}catch(err){
    res.status(404).json({data:err +''})
}

 } 


