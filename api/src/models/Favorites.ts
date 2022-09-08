import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './User';

class Favorites {

    @prop({ type: () => [String], default:[]})
    favorites:string[];
    @prop({ref: () => User , required:true})
    user: Ref <User>;


}
const FavoritesModels = getModelForClass(Favorites)
export default FavoritesModels;