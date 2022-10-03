const { GET_CITY, GET_CITIES, CITY_DETAIL, ADD_FAVORITES,
    DELETE_FAVORITES, REMOVE_FAVORITES, GET_FAVORITES,
     SIGN_IN, DELETE_ACCOUNT, REMOVE_CITY,LOG_OUT } = require('../actions/actionTypes')

const initialState = {
 cityDetail:{},
 citiesHome:[],
 cities:[],
 user:{username: JSON.parse(localStorage.getItem('tokenUser'))?.username || false },
 favorites:[]

}

const rootReducer = (state = initialState, action) =>{
switch (action.type){
case GET_CITY:
    let cities = null;
    if(state.cities.find(el => el.name === action.payload.name)){ 
    cities = state.cities 
    alert(`you already have the city ${action.payload.name} added`)
    }
    else cities = state.cities.concat(action.payload)
    return{
        ...state,
        cities : cities
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
case REMOVE_CITY:
    return {
        ...state,
        cities : state.cities.filter(el => el.name !== action.payload)
    }
case LOG_OUT:
    return{
        ...state,
        user:{username: action.payload}
    }
default:
    return {
        ...state
    }
}
}
export default rootReducer;