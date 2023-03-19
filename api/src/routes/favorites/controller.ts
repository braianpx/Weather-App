import {Response, Request} from 'express';
import FavoritesModels from '../../models/Favorites';
import { Favorites } from '../../models/Favorites';
import axios from 'axios';
import { User } from '../../models/User';
import { DocumentType } from '@typegoose/typegoose';
const { API_KEY} = process.env;

export const addFavorites = async (req:Request ,res:Response) =>{
    const city:string = req.body.city as string; 
    const idUser:User = req.user as User;
    try{
        if(!idUser) 
            return res.status(400).json({data:'unexpected error'});

        const favorite:DocumentType<Favorites> | null = await FavoritesModels.findOne({user:idUser});
        if(!favorite)
            return res.status(404).json({data:'User not found'})
        if(favorite.favorites.at(5)) 
            return res.status(400).json({data: "you can no longer add more cities to favorites, you reached the maximum limit"})
        if(favorite.favorites.find(el => el === city))
            return  res.status(400).json({data:'the city already exists in your favorites'})
        
        favorite.favorites.push(city);
        await FavoritesModels.updateOne({user:idUser},{favorites:favorite.favorites}); 
        return res.status(201).send('successfully add');
    }catch(err:any){
        return res.status(500).json({data:err.message})
    }
};

export const removeFavorites = async (req:Request ,res:Response) =>{
    const city:string = req.body.city as string;
    const idUser:DocumentType<User> | null = req.user as DocumentType<User> | null;
    try{
        if(!idUser) 
            return res.status(400).json({data:'unexpected error'});

            const favorite: DocumentType<Favorites> | null = await FavoritesModels.findOne({user:idUser});
            if(!favorite)
                return res.status(404).json({data:'User not found'});
            const arrayFavorites:string[] = favorite?.favorites.filter((el:string) => el !== city);
            await FavoritesModels.updateOne({user:idUser},{favorites:arrayFavorites});
            return res.status(200).json({data:'successfully deleted'});
    }catch(err:any){
        return res.status(500).json({data:err.message});
    }
};

export const deleteFavorites = async (req:Request ,res:Response) =>{
    const idUser:DocumentType<User>| null = req.user as DocumentType<User> | null;
    try{
        if(!idUser) 
            return res.status(400).json({data:'unexpected error'});
        const deleteFav = await FavoritesModels.deleteOne({user:idUser});
        if(!deleteFav.acknowledged) 
            return res.status(404).json({data:'unexpected error'});
        return res.status(200).send('successfully deleted');
    }catch(err:any){
        return res.status(500).json({data:err.message});
}}; 

export const getFavorites = async (req:Request ,res:Response) =>{
    const idUser:DocumentType<User>| null = req.user as DocumentType<User> | null;
try{
    if(!idUser)
        return res.status(401).json({data:"unexpected error"});
    const favorites:DocumentType<Favorites> | null = await FavoritesModels.findOne({idUser:idUser},{favorites:1, _id:0});
    
    if(!favorites)
        return res.status(404).json('Favorites not found')

    const cities:Array<object> = await Promise.all(favorites.favorites.map(async(el:string)=>{
        const city:string = el.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return await (await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)).data;
    }));
    return res.status(200).json(cities);
}catch(err:any){
    return res.status(500).json({data:err.message});
}}; 


