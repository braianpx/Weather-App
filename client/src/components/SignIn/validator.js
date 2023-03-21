function validatorLogin(userState){
    let errors = {}
    
    if(!userState.password){
        errors.password = "password is required";
    }
    else if(userState.password){
        if(userState.password.length < 8){
            errors.password = "the password must have at least 8 characters"
        }
        else if(userState.password.length > 15){
            errors.password = "the password exceeds 15 characters"
        }
        else if(/(?=.*[(°¬\[|!#%/()?¡'¿//~*}`{///^´¨/.:,;>\]<])/.test(userState.password)){
            errors.password = "contains certain special characters that are not accepted";
        }
        else if(/(?=.*[" "])/.test(userState.password)){
            errors.password = "should not contain space";
        }
     }
     
    return errors;
    
    }
    
    
    export default validatorLogin;