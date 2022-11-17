import {Response, Request} from 'express';
import FavoritesModels from '../../models/Favorites';
const axios = require('axios');
const { API_KEY} = process.env;

/////// Put ////////
export const addFavorites = async (req:Request ,res:Response) =>{
    const city:string = req.body.city; 
    console.log(req.body)
    console.log(city)
    const idUser = req.user;
    try{
        if(idUser) {
            const favorite = await FavoritesModels.findOne({user:idUser})
            if(!favorite?.favorites.find(el => el === city && favorite?.favorites.length < 6)){
            favorite?.favorites.push(city)
            await FavoritesModels.updateOne({user:idUser},{favorites:favorite?.favorites})
            res.status(200).send('successfully add')
            return;
            }else if(favorite?.favorites.find(el => el === city)){
                res.status(404).json({data:'the city already exists in your favorites'})
            return
            }else if(favorite?.favorites.length === 5){
                res.status(401).json({data: "you can no longer add more cities to favorites, you reached the maximum limit"})
            return
            }
        }
        if(!idUser) res.status(404).json({data:'unexpected error'})
    }catch(err){
        res.status(404).json({data:err+''})
    }
};

export const removeFavorites = async (req:Request ,res:Response) =>{
    const city:string = req.body.city;
    const idUser = req.user;
    console.log(idUser)
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
    const idUser = req.user;
    try{
        if(idUser){
        await FavoritesModels.deleteOne({user:idUser}) 
        res.status(200).send('successfully deleted')
        return;
        };
        res.status(404).json({data:'error as ocurrent'})
}catch(err){
    res.status(404).json({data:err+''})
};
} 



/////////// get //////////

export const getFavorites = async (req:Request ,res:Response) =>{
    const idUser = req.user;
try{
    if(idUser){
    const favorites:any = await FavoritesModels.findOne({idUser:idUser},{favorites:1, _id:0});
    if(favorites.favorites[0]){
    const cities = favorites.favorites.map((el:string)=>{
        const citie = el.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${citie}&appid=${API_KEY}`)
    });
    const citiesResolve: object[] = []
    Promise.all(cities)
    .then((data) => {
        data.forEach(el => citiesResolve.push(el.data))
        res.status(200).json(citiesResolve)
    })
    .catch(err => { 
        res.status(404).json({data:err + ""})
    })
    }
    else if(!favorites.favorites[0]){
        res.status(404).json({data:"No favorites found"})
        return;
    }
    }else if(!idUser){
        res.status(401).json({data:"unexpected error"})
        return;
    }
}catch(err){
    console.log("err")
    res.status(404).json({data:err +''})
}

 } 


