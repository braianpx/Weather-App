function validatorRegister(userState){
    let errors = {}
    if(!userState.username){
        errors.username = "username is required"
    }
     else if(userState.username){
        if(userState.username.length > 12){
            errors.username = "the username exceeds 12 characters"
        }
                else if(/(?=.*[(°¬|!#[$%&-/()=?¡'¿//+~*}`{///^´¨/-/_/.:,;><@\]])/.test(userState.username)){
                            errors.username = "must not contain special characters";
                        }
                else if(/(?=.*[" "])/.test(userState.username)){
                    errors.username = "should not contain space";
                }
    }
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
     
    if(!userState.repeatPassword){
        errors.repeatPassword = "repeat password is required"
    }
     else if(userState.repeatPassword){
        if(userState.password.length > 15){
            errors.password = "the repeat password exceeds 15 characters"
        }
        else if(/(?=.*[(°¬\[|!#%/()?¡'¿//~*}`{///^´¨/.:,;>\]<])/.test(userState.password)){
            errors.password = "contains certain special characters that are not accepted";
        }
        else if(/(?=.*[" "])/.test(userState.password)){
            errors.password = "should not contain space";
        }
        else if(userState.password !== userState.repeatPassword){
            errors.repeatPassword = "Passwords do not match";
        }
     }
     
    return errors;    
}

export default validatorRegister;
