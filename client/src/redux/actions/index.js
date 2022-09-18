const { GET_CITY, GET_CITIES, ADD_FAVORITES, DELETE_FAVORITES,
REMOVE_FAVORITES, GET_FAVORITES, SIGN_UP, SIGN_IN, DELETE_ACCOUNT,
 URL_API, CITY_DETAIL, REMOVE_CITY} = require('./actionTypes.js')
 const axios = require('axios')
console.log(URL_API)

//// City 
export const getCity = (city) =>{
    return function (dispatch){
        axios({
            method:'get',
            url:`${URL_API}/city?name=${city}`,
            headers: {
              "Content-Type": "application/json",
            }
          })
        .then(data => {
            dispatch({  
                type:GET_CITY,
                payload: data.data
                });    
        })
        .catch(err => err) 
    }
 };
 export const getCities = () =>{
    return function (dispatch){
        axios({
            method:'get',
            url:`${URL_API}/city`,
            headers: {
                "Content-Type": "application/json",
              },
        })
        .then(city => {
            dispatch({  
                type:GET_CITIES,
                payload: city.data
                });    
        })
        .catch(data => console.log(data))
    }
}
export const addCityDetail = (city) =>{ 
 return function (dispatch){
    return dispatch({
        type: CITY_DETAIL,
        payload:city
    })
 }   
};
export const removeCity = (city) =>{
    return function (dispatch){
        return dispatch({
            type: REMOVE_CITY,
            payload: city
        })
    }
}


/// Fav
export const addFavorites = (city) =>{
    return function (dispatch){
        axios({
            method:'put',
            url:`${URL_API}/favorites/add`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              },
            data:{city:JSON.stringify(city.name)}
        })
        .then(data => {
            dispatch({
                type:ADD_FAVORITES,
                payload: city
            })
            return data;
        }).catch(err => err)
     }
}
export const deleteFavorites = () =>{
    return function (dispatch){
        axios.delete(`${URL_API}/favorites/delete`)
        .then(data => {
            dispatch({
                type:DELETE_FAVORITES,
                payload: []
            })
            return data;
        })
     }
}
export const removeFavorites = (cityName) =>{
    return function (dispatch){
        axios({
            method:'put',
            url:`${URL_API}/favorites/remove`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("tokenUser")}`
              },
            data:{city:JSON.stringify(cityName)}
        }).then(data=>{
            dispatch({
                type:REMOVE_FAVORITES,
                payload: cityName
            })
            return data;
        }).catch(err => err)
     }
}
export const getFavorites = () =>{
    return function (dispatch){
        axios({
            method:'get',
            url:`${URL_API}/favorites`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("tokenUser")}`
              }
        }).then(data=>{
            dispatch({
                type:GET_FAVORITES,
                payload: data.data
            })
        }).catch(err => err)
     }
}
/// account
export const signUp = (signUpForm) =>{
    return function (dispatch){
        axios({
            method:'post',
            url:`${URL_API}/user/signUp`,
            headers: {
                "Content-Type": "application/json",
              },
            data:JSON.stringify(signUpForm)
        }).then(data=>{
            dispatch({
                type:SIGN_UP,
                payload: {}
            })
            return data.data;
        }).catch(err => err)
     }
}
export const signIn = (singInForm) =>{
    return function (dispatch){
        axios({
            method:'post',
            url:`${URL_API}/user/signIn`,
            headers: {
                "Content-Type": "application/json",
              },
            data:JSON.stringify(singInForm)
        }).then(data=>{
            dispatch({
                type: SIGN_IN,
                payload: data.data.username
            })
            return data.data;
        }).catch(err => err)
     }
}
export const deleteAccount = () =>{
    return function (dispatch){
        fetch({
            method:'post',
            url:`${URL_API}/user/delete`,
            headers: {
                "Content-Type": "application/json",
                 Authorization: `Bearer ${localStorage.getItem("tokenUser")}`
                },
        }).then(data=>{
            dispatch({
                type: DELETE_ACCOUNT,
                payload: {}
            })
            return data.data;
        }).catch(err => err)
     }
}
