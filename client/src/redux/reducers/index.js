const { GET_CITY, GET_CITIES, CITY_DETAIL, ADD_FAVORITES,
    DELETE_FAVORITES, REMOVE_FAVORITES, GET_FAVORITES, SIGN_UP,
     SIGN_IN, DELETE_ACCOUNT } = require('../actions/actionTypes')

const initialState = {
 cityDetail:{},
 citiesHome:[],
 cities:[],
 user:{},
 favorites:[]

}

const rootReducer = (state = initialState, action) =>{
switch (action.type){
case GET_CITY:
    return{
        ...state,
        cities : state.cities.concat(action.payload)
    }
case GET_CITIES:
    return{
        ...state,
        citiesHome: action.payload
    }
case CITY_DETAIL:
    return{
        ...state,
        cityDetail: state.cities.find(el => el.name === action.payload) || {}
    }
case ADD_FAVORITES:
    return{
        ...state,
        favorites: state.favorites.concat(action.payload)
    }
case DELETE_FAVORITES:
    return{
        ...state,
        favorites: action.payload
    }
case REMOVE_FAVORITES:
    return{
        ...state,
        favorites: state.favorites.filter(el => el.name !== action.payload)
    }
case GET_FAVORITES:
    return {
        ...state,
        favorites: action.payload
    }
case SIGN_UP:
    return {
        ...state,
        user: action.payload
    }
case SIGN_IN:
    return {
        ...state,
        user: {username: action.payload}
    }
case DELETE_ACCOUNT:
    return {
        ...state,
        user: action.payload
    }
default:
    return {
        ...state
    }
}
}
export default rootReducer;