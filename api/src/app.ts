require('./db');
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import JWTStrategy from './middlewares/auth';
const city = require('./routes/city/router');
const favorites = require('./routes/favorites/router');
const user = require('./routes/user/router')

const server = express();

//////  Middlewares ////
server.use(cors());
server.use(express.json()); ////// transforma la req de body en json
server.use(morgan('dev'));
server.use(express.urlencoded({extended:false}))
server.use(passport.initialize())
passport.use(JWTStrategy)

////////

server.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

////// Routes ////


server.use('/city',city)
server.use('/favorites',favorites)
server.use('/user', user)


//// Error Handler ////
const errorHandler: express.ErrorRequestHandler = (err, _req, res, _next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
};
server.use(errorHandler);


export default server; 