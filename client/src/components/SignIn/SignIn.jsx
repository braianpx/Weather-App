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
    if(errors.response) setErrors({})
    setUser({
        ...user,
        [e.target.name] : e.target.value
    })
    if(e.target.name === 'password')  
        setErrors(validatorLogin({
            ...user,
            [e.target.name] : e.target.value
        }))
                
}
const verifyErrors = () => {
    return Object.values(errors).at(0) || 
    !Object.values(user).at(1)
    ? true 
    : false
}
const handleOnSubmit = async (e) =>{
    e.preventDefault()
    setErrors(validatorLogin({
    ...user 
    }))
    if(!verifyErrors()){
        const response = await signIn(user)
        if(response.response)
            setErrors({
                ...errors,
                response : response.response.data.data
            })
        else{
            window.localStorage.setItem("tokenUser",JSON.stringify(response))
            dispatch(signInDispatch(JSON.parse(window.localStorage.getItem("tokenUser")).username))
            SetIsLogin(true)
            setTimeout(()=>{props.setSwitchLogIn(false)},1000) 
        }
    }
    setSpinner(false)
}
const switchSpinner = () =>{
    if(!verifyErrors())
        setSpinner(true)
}
    return(
        <div id='idContainerSignIn' className="container text-center border border-dark rounded-2 border-opacity-50 bg-white ">
        { 
        isLogin? 
            <div className='mt-4 mb-5'>
                <i className="bi bi-check-circle-fill text-success" id="id-i-check"></i>
                <h4 className="text-success">Successful login</h4>
            </div>
            :
            <div>
            <div className="col-12 text-end">
                <i className="bi bi-x fs-4" onClick={()=>{props.setSwitchLogIn(false)}} style={{cursor:"pointer"}}></i>
            </div>
            <form className="g-3" onSubmit={handleOnSubmit}>
                
                <div className="row mb-3 justify-content-center">
                    <label className="col-sm-12 col-form-label fw-semibold fs-3">Log In</label>
                </div>
                {errors.response?
                    <div className="alert alert-danger alert-dismissible fade show " role="alert">
                    <strong>{errors.response}</strong>  the username does not exist or the password is incorrect
                    </div>
                   :
                    null    
                }
                
                <div className="row my-3 justify-content-center">   
                    <div className="col-8">
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
                    <div className="col-8">
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
                <div className="row justify-content-center">
                    <div className="col-8">
                    <button type="submit" className="btn btn-primary mt-2 w-100" onClick={switchSpinner} disabled={verifyErrors()}>
                    {   spinner?<>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="ms-1"> Loading...</span>
                        </>
                        :
                        'Log In'    
                    }
                   </button>
                    </div>
                </div>
                
            </form>
            <div className="container text-center mb-5 mt-4"> 
                <div className="col-12">
                    <p className="text text-secondary" >Not registered? <span onClick={()=>props.setSwitchSign(false)} className="text-primary" style={{cursor:"pointer"}}> Create an Account </span></p> 
                </div>
            </div>
            </div>}
        </div>
    )
}

export default SignIn;