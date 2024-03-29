import { GET_CITY, GET_CITIES, ADD_FAVORITES, DELETE_FAVORITES,
REMOVE_FAVORITES, GET_FAVORITES, SIGN_IN, DELETE_ACCOUNT,
URL_API, CITY_DETAIL, REMOVE_CITY, LOG_OUT} from './actionTypes.js';
import axios from 'axios';

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
        .catch(err => {
            if(err.response.status === 404 && err.response.statusText === "Not Found"){
                alert('city ​​not found')
            }
        return err;
        }) 
    }
 };
 
 export const getCities = () =>{
    return function (dispatch){
        axios({
            method:'get',
            url:`${URL_API}/city/all`,
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
        .catch(data => data)
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


/// account
export const signUp = (signUpForm) =>{
    return axios({
            method:'post',
            url:`${URL_API}/user/signUp`,
            headers: {
                "Content-Type": "application/json",
              },
            data:JSON.stringify(signUpForm)
        }).then(data =>  data.data)
        .catch(err => err)
}
export const signIn = (singInForm) =>{
        return axios({
            method:'post',
            url:`${URL_API}/user/signIn`,
            headers: {
                "Content-Type": "application/json",
              },
            data:JSON.stringify(singInForm)
        })
        .then(data=> data.data)
        .catch(err =>  err)
}
export const signInDispatch = (data) =>{
    return function (dispatch){
            dispatch({
                type: SIGN_IN,
                payload: data
            })
        }
    }
export const deleteAccount = () =>{
       return fetch(`${URL_API}/user/delete`,{
            method:'DELETE',
            headers: {
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${JSON.parse(localStorage.getItem("tokenUser")).token}`
                },
        })
        .then(async(data) => {
            if(data.status === 404) return {response: await data.json()}
            else return data.json();
        })
        .then(response => response)
        .catch(err =>  err)
     }
export const dispDeleteAccount = () => {
    return function(dispatch){
         dispatch({
            type: DELETE_ACCOUNT,
            payload: {}
        })
        dispatch({
            type:DELETE_FAVORITES,
            payload: []
        })
    }
}
export const logOut = (data) =>{
    return function (dispatch){
        window.localStorage.clear()
            dispatch({
                type: LOG_OUT,
                payload: data
            })
            dispatch({
                type:DELETE_FAVORITES,
                payload: []
            })
        };
    };;
/// Fav
export const addFavorites = (cityName) =>{
    return function (dispatch){
        axios({
            method:'put',
            url:`${URL_API}/favorites/add`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("tokenUser")).token}`
              },
            data:JSON.stringify({city:cityName})
        })
        .then(data => {
            dispatch({
                type:ADD_FAVORITES,
                payload: cityName
            })
            return data;
        }).catch(err => {
            if(err.response.data === "Unauthorized" && err.response.status === 401){
                window.localStorage.clear()
                dispatch({
                    type: LOG_OUT,
                    payload: false
                })
                dispatch({
                    type:DELETE_FAVORITES,
                    payload: []
                })
                alert("Session time out, log in again")
            }
            return err})
     }
}
export const removeFavorites = (cityName) =>{
    return function (dispatch){
        axios({
            method:'put',
            url:`${URL_API}/favorites/remove`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("tokenUser")).token}`
              },
            data:JSON.stringify({city:cityName})
        }).then(data=>{
            dispatch({
                type:REMOVE_FAVORITES,
                payload: cityName
            })
            return data;
        }).catch(err => {
            if(err.response.data === "Unauthorized" && err.response.status === 401){
                window.localStorage.clear()
                dispatch({
                    type: LOG_OUT,
                    payload: false
                })
                dispatch({
                    type:DELETE_FAVORITES,
                    payload: []
                })
                alert("Session time out, log in again")
            }
            return err})
     }
}
export const getFavorites = () =>{
    return function (dispatch){
        axios({
            method:'get',
            url:`${URL_API}/favorites`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("tokenUser"))?.token}`
              }
        }).then(data=>{
            dispatch({
                type:GET_FAVORITES,
                payload: data.data
            })
        }).catch(err => {
            if(err.response.data === "Unauthorized" && err.response.status === 401){
                window.localStorage.clear()
                dispatch({
                    type: LOG_OUT,
                    payload: false
                })
                dispatch({
                    type:DELETE_FAVORITES,
                    payload: []
                })
                alert("Session time out, log in again")
            }
            return err})
     }
}
