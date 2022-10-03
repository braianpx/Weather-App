import {Response, Request} from 'express';
// const axios = require('axios');
// const { API_KEY} = process.env;


///////

const Cairns = JSON.parse(`{"coord":{"lon":145.77,"lat":-16.92},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"base":"stations","main":{"temp":300.15,"pressure":1007,"humidity":74,"temp_min":300.15,"temp_max":300.15},"visibility":10000,"wind":{"speed":3.6,"deg":160},"clouds":{"all":40},"dt":1485790200,"sys":{"type":1,"id":8166,"message":0.2064,"country":"AU","sunrise":1485720272,"sunset":1485766550},"id":2172797,"name":"Cairns","cod":200}`);

const Londres = JSON.parse(`{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],"base":"stations","main":{"temp":280.32,"pressure":1012,"humidity":81,"temp_min":279.15,"temp_max":281.15},"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"London","cod":200}`);

const Denver = JSON.parse(`{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}],"base":"stations","main":{"temp":280.32,"pressure":1012,"humidity":81,"temp_min":12.12,"temp_max":121},"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"Denver","cod":200}`);

var cities = [Londres, Cairns, Denver];


//////


//////// Get ////////

const getCity = async (req:Request, res:Response) => {
const name = req.query.name;
try{
if(name){
    // let nameWithoutSpace = name.replace(" ","%20")
    console.log(1)
    // const city = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`);
    res.status(200).send(Londres)
}else if(!name){
    console.log(2)
    res.status(404).json({data:"Not Found"})
}
}catch(e){
res.status(404).json({data:e +''})
}
};

const getCities = async (req:Request, res:Response) => {
console.log('this console.log is for req',req.body)
try{
    // const names:string[] = ["Buenos Aires","Rio De Janeiro","London","Bogota","Washington DC"]
    // const cities = names.map(async(el)=>{
    //     return await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${el}&appid=${API_KEY}`).data;
    // });
    //respondo con la ciudad
    res.status(200).json(cities)
}catch(err){
res.status(404).json({data:err+''})
}
}


module.exports = {
    getCity,
    getCities
}