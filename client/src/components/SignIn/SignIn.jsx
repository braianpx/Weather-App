import { useState } from 'react';
import validatorLogin from './validator';
import { signIn, signInDispatch } from '../../redux/actions/index';
import { useDispatch } from 'react-redux';
import './SignIn.css';

const SignIn = (props) =>{

const dispatch = useDispatch();
const [isLogin, SetIsLogin ] = useState(false)
const [ spinner, setSpinner] = useState(false)
const [errors,setErrors] = useState({});
const [user, setUser] = useState({
    username:"",
    password:""
})
const handleInputChange = (e) =>{
if(errors.response){
    setErrors({})
    }
setUser({
    ...user,
    [e.target.name] : e.target.value
})
setErrors(validatorLogin({
    ...user,
    [e.target.name] : e.target.value
}))
}
const handleOnSubmit = (e) =>{
e.preventDefault()
setErrors(validatorLogin({
   ...user 
}))
setTimeout(async()=>{
if(!Object.keys(errors).length){
    const response = await signIn(user)
    if(Object.keys(response).find(el => el === "response")){
        setErrors({
            ...errors,
            response : response.response.data.data
        })
    }else{
        window.localStorage.setItem("tokenUser",JSON.stringify(response))
        dispatch(signInDispatch(JSON.parse(window.localStorage.getItem("tokenUser")).username))
        SetIsLogin(true)
        setTimeout(()=>{props.setSwitchLogIn(false)},1000) 
    }
}else{
    setErrors({...errors})
}
setSpinner(false)
},700)
}
const switchSpinner = () =>{
    console.log(errors)
   if(!errors.username && !errors.password && user.password[0] && user.username[0]){
        setSpinner(true)
    }
}
    return(
        <div class="container text-center border border-dark rounded-2 border-opacity-50 bg-white ">
        { 
        isLogin? 
            <div className='mt-4 mb-5'>
                <i class="bi bi-check-circle-fill text-success" id="id-i-check"></i>
                <h4 class="text-success">Successful login</h4>
            </div>
            :
            <div>
            <div class="col-12 text-end">
                <i class="bi bi-x fs-4" onClick={()=>{props.setSwitchLogIn(false)}} style={{cursor:"pointer"}}></i>
            </div>
            <form class="g-3" onSubmit={handleOnSubmit}>
                
                <div class="row mb-3 justify-content-center">
                    <label class="col-sm-12 col-form-label fw-semibold fs-3">Log In</label>
                </div>
                {errors.response?
                    <div class="alert alert-danger alert-dismissible fade show " role="alert">
                    <strong>{errors.response}</strong>  the username does not exist or the password is incorrect
                    </div>
                   :
                    null    
                }
                
                <div class="row my-3 justify-content-center">   
                    <div class="col-sm-8">
                    <input type="username" class={`form-control ${errors.username || errors.response?"is-invalid":user.username[0]?'is-valid':null}`} 
                    aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                    value={user.username}
                    name='username'
                    id="inputUsername3" 
                    placeholder=' username ' 
                    onChange={handleInputChange}
                    required/>
                    <div id="inputUsername3Feedback" class="invalid-feedback">
                       {errors.username}
                    </div>
                    </div>                 
                </div>
                <div class="row mb-3 justify-content-center">
                    <div class="col-sm-8">
                    <input type="password" class={`form-control ${errors.password || errors.response?"is-invalid":user.password[0]?'is-valid':null}`}
                    aria-describedby="inputGroupPrepend3 validationServerPasswordFeedback"
                    value={user.password}
                    name='password' 
                    id="inputPassword3" 
                    placeholder=' password '
                    onChange={handleInputChange} 
                    required/>
                    <div id="inputPassword3Feedback" class="invalid-feedback">
                       {errors.password}
                    </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-sm-8">
                    <button type="submit" class="btn btn-primary mt-2 w-100" onClick={switchSpinner}>
                    {   spinner?<>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span class="ms-1"> Loading...</span>
                        </>
                        :
                        'Log In'    
                    }
                   </button>
                    </div>
                </div>
                
            </form>
            <div class="container text-center mb-5 mt-4"> 
                <div class="col-12">
                    <p class="text text-secondary" >Not registered? <span onClick={()=>props.setSwitchSign(false)} class="text-primary" style={{cursor:"pointer"}}> Create an Account </span></p> 
                </div>
            </div>
            </div>}
        </div>
    )
}

export default SignIn;