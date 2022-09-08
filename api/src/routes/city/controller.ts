import {Response, Request} from 'express';
const axios = require('axios');
const { API_KEY} = process.env;


//////// Get ////////

const getCity = async (_req:Request, res:Response) => {

const name:string = _req.body.name;
const names:string[] = _req.body.names;
try{
if(name){
    const city = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`);
res.status(200).json(city.data)
}else if(names){
    const cities = names.map(async(el)=>{
        return await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${el}&appid=${API_KEY}`).data;
    });
    res.status(200).json(cities)

}else{
    res.status(404).json({data:"Not Found"})
}
}catch(e){
res.status(404).json({data:e +''})
}
};


const getImage = async (_req:Request, res:Response) => {
const image:string = _req.body.image;
try{
    if(image){
    const png = await axios.get(`http://openweathermap.org/img/wn/${image}@2x.png`);
    res.status(200).render(png)
    }
    res.status(404).json({data:'unexpected error'})
}catch(err){
res.status(404).json({data:err+''})
}
};


module.exports = {
    getCity,
    getImage,
}