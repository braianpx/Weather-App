import { useState } from 'react';
import validatorRegister from './validator.js';
import { signUp } from '../../redux/actions';

const SingUp = (props) =>{

const [signUpSuccess, setSignUpSuccess] = useState({
    boolean:false,
    message:null
})
const [spinner, setSpinner] = useState(false)
const [errors,setErrors] = useState({});
const [user, setUser] = useState({
    username:"",
    password:"",
    repeatPassword:""
})
const handleInputChange = (e) =>{
    if(errors.response){
        setErrors({})
        }
    setUser({
        ...user,
        [e.target.name] : e.target.value
    })
    setErrors(validatorRegister({
        ...user,
        [e.target.name] : e.target.value
    }))
    }
const switchSpinner = () =>{
    if(!errors.username && !errors.password && !errors.repeatPassword &&
        user.password[0] && user.username[0] && user.repeatPassword[0]){
         setSpinner(true)
     }
 }
const handleOnSubmit = (e) =>{
e.preventDefault()
setErrors(validatorRegister({
   ...user 
}))
setTimeout(async()=>{
if(!Object.keys(errors).length){
    const response = await signUp(user)
    if(Object.keys(response).find(el => el === "response")){
        setErrors({
            ...errors,
            response : response.response.data
        })
    }else{
        setSignUpSuccess({
        boolean:true,
        message:response
        })
        setUser({
            username:"",
            password:"",
            repeatPassword:""
        })
    }
}
setSpinner(false)
},700)
}
    return(
        <div class="container text-center border border-dark rounded-2 border-opacity-50 bg-white ">
            <div class="col-12 text-end">
                <i class="bi bi-x fs-4" onClick={()=>{props.setSwitchLogIn(false)}} style={{cursor:"pointer"}}></i>
            </div>
            <form class="g-3" onSubmit={handleOnSubmit}>
                <div class="row mb-3 justify-content-center">
                    <label class="col-sm-12 col-form-label fw-semibold fs-3">Sign Up</label>
                </div>
                {
                    errors.response?
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{errors.response}</strong>
                    </div>
                   :
                    null   
                }
                {
                signUpSuccess.boolean?
                <div class="alert alert-success d-flex" role="alert">
                    <div className='col-11'>{`${signUpSuccess.message} `}
                        <span class="alert-link" onClick={()=>props.setSwitchSign(true)} style={{cursor:"pointer"}}>go to login</span>
                    </div>
                    <div className='col-1' onClick={()=>setSignUpSuccess({boolean:false,message:null})} style={{cursor:"pointer"}}>
                        x
                    </div>
                </div>
                :null
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
                <div class="row mb-3 justify-content-center">
                    <div class="col-sm-8">
                    <input type="password" class={`form-control ${errors.repeatPassword || errors.response?"is-invalid":user.repeatPassword[0]?'is-valid':null}`}
                    aria-describedby="inputGroupPrepend3 validationServerPasswordFeedback"
                    value={user.repeatPassword}
                    name='repeatPassword' 
                    id="inputRepeatPassword3" 
                    placeholder=' repeatPassword '
                    onChange={handleInputChange} 
                    required/>
                    <div id="inputRepeatPassword3Feedback" class="invalid-feedback">
                       {errors.repeatPassword}
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
                        'Sign up'    
                    } 
                    </button>
                    </div>
                </div>
            </form>
            <div class="container text-center mb-5 mt-4"> 
                <div class="col-12">
                    <p class="text text-secondary" > Are you already registered? <span onClick={()=>props.setSwitchSign(true)} class="text-primary" style={{cursor:"pointer"}}> Log in </span></p> 
                </div>
            </div>
        </div>
    )
}

export default SingUp;