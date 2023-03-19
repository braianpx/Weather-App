require('./db');
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import JWTStrategy from '../middlewares/auth';
import city from '../routes/city/router';
import favorites from '../routes/favorites/router';
import user from '../routes/user/router';

const server = express();

//////  Middlewares ////
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
server.use(bodyParser.json({ limit: '50mb'} ));
server.use(cookieParser());
server.use(cors()); ////// transforma la req de body en json
server.use(morgan('dev'));
server.use(passport.initialize());
passport.use(JWTStrategy);

////////

server.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

////// Routes ////


server.use('/city',city);
server.use('/favorites',favorites);
server.use('/user', user);


//// Error Handler ////
const errorHandler: express.ErrorRequestHandler = (err, _req, res, _next) => {  
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
};
server.use(errorHandler);


export default server; 