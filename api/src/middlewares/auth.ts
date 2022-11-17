import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import UserModel from '../models/User';

export default new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETJWT
    },
    async (payload, done) => {
        try{
            const user = await UserModel.findById(payload.id)
            if(user){
                return done(null,user)
            }
            return done(null,false)
        }catch(err){
            return done(err);
        }
    }
);