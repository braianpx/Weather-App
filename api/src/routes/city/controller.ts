import {Response, Request} from 'express';
import axios from 'axios';
const { API_KEY} = process.env;


export const getCity = async (req:Request, res:Response) => {
    let name: string = req.query.name as string;
    try{
        if(!name)
            return res.status(400).json({data:"unexpected error"});
    const nameWithoutSpace:string = name.replace(" ","%20");
    let city;
    try{
        city = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${nameWithoutSpace}&appid=${API_KEY}`);
    }
    catch(err){
        return res.status(404).json({data:'city not found'})
    }
    return res.status(200).send(city.data);
}catch(err:any){
    console.log(err.message)
    return res.status(500).json({data:err.message});
}};

export const getCities = async (_req:Request, res:Response) => {
try{
    const names:string[] = ["Buenos Aires","Rio De Janeiro","London","Bogota","Washington DC"];
    const cities = await Promise.all(names.map(async(el)=>{
        return (await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${el}&appid=${API_KEY}`)).data;
    }));
    return res.status(200).json(cities);
}catch(err:any){
    return res.status(500).json({data:err.message});
}};
