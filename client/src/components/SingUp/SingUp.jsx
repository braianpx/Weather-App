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
    if(!verifyErrors())
        setSpinner(true)
}

const verifyErrors = () => {
    return Object.values(errors).at(0) || 
    !Object.values(user).at(2)
    ? true 
    : false
}
const handleOnSubmit = async (e) =>{
    e.preventDefault()
    setErrors(validatorRegister({
    ...user 
    }));
    if(!verifyErrors()){
        const response = await signUp(user)
        if(response.response)
            setErrors({
                ...errors,
                response : response.response.status === 500? 'ups error unexpected' : response.response.data
            });
        else{
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
}
    return(
        <div className="container text-center border border-dark rounded-2 border-opacity-50 bg-white ">
            <div className="col-12 text-end">
                <i className="bi bi-x fs-4" onClick={()=>{props.setSwitchLogIn(false)}} style={{cursor:"pointer"}}></i>
            </div>
            <form className="g-3" onSubmit={handleOnSubmit}>
                <div className="row mb-3 justify-content-center">
                    <label className="col-sm-12 col-form-label fw-semibold fs-3">Sign Up</label>
                </div>
                {
                    errors.response?
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{errors.response}</strong>
                    </div>
                   :
                    null   
                }
                {
                signUpSuccess.boolean?
                <div className="alert alert-success d-flex" role="alert">
                    <div className='col-11'>{`${signUpSuccess.message} `}
                        <span className="alert-link" onClick={()=>props.setSwitchSign(true)} style={{cursor:"pointer"}}>go to login</span>
                    </div>
                    <div className='col-1' onClick={()=>setSignUpSuccess({boolean:false,message:null})} style={{cursor:"pointer"}}>
                        x
                    </div>
                </div>
                :null
                }
                <div className="row my-3 justify-content-center">   
                    <div className="col-sm-8">
                    <input type="username" className={`form-control ${errors.username || errors.response?"is-invalid":user.username[0]?'is-valid':null}`} 
                    aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                    value={user.username}
                    name='username'
                    id="inputUsername3" 
                    placeholder=' username ' 
                    onChange={handleInputChange}
                    required/>
                    <div id="inputUsername3Feedback" className="invalid-feedback">
                       {errors.username}
                    </div>
                    </div>                 
                </div>
                <div className="row mb-3 justify-content-center">
                    <div className="col-sm-8">
                    <input type="password" className={`form-control ${errors.password || errors.response?"is-invalid":user.password[0]?'is-valid':null}`}
                    aria-describedby="inputGroupPrepend3 validationServerPasswordFeedback"
                    value={user.password}
                    name='password' 
                    id="inputPassword3" 
                    placeholder=' password '
                    onChange={handleInputChange} 
                    required/>
                    <div id="inputPassword3Feedback" className="invalid-feedback">
                       {errors.password}
                    </div>
                    </div>
                </div>
                <div className="row mb-3 justify-content-center">
                    <div className="col-sm-8">
                    <input type="password" className={`form-control ${errors.repeatPassword || errors.response?"is-invalid":user.repeatPassword[0]?'is-valid':null}`}
                    aria-describedby="inputGroupPrepend3 validationServerPasswordFeedback"
                    value={user.repeatPassword}
                    name='repeatPassword' 
                    id="inputRepeatPassword3" 
                    placeholder=' repeatPassword '
                    onChange={handleInputChange} 
                    required/>
                    <div id="inputRepeatPassword3Feedback" className="invalid-feedback">
                       {errors.repeatPassword}
                    </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-sm-8">
                    <button type="submit" className="btn btn-primary mt-2 w-100" onClick={switchSpinner} disabled={verifyErrors()}>
                    {   spinner?<>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="ms-1"> Loading...</span>
                        </>
                        :
                        'Sign up'    
                    } 
                    </button>
                    </div>
                </div>
            </form>
            <div className="container text-center mb-5 mt-4"> 
                <div className="col-12">
                    <p className="text text-secondary" > Are you already registered? <span onClick={()=>props.setSwitchSign(true)} className="text-primary" style={{cursor:"pointer"}}> Log in </span></p> 
                </div>
            </div>
        </div>
    )
}

export default SingUp;