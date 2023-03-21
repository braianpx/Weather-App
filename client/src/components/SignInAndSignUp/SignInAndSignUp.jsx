import { useState } from "react";
import SignIn from "../SignIn/SignIn";
import SingUp from "../SingUp/SingUp";
import './SignInAndSignUp.css'

const SingInAndSingUp = (props) =>{

const [switchSign, setSwitchSign] = useState(true)
    return(
        <div id='id-div-conteiner-sign' className="position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-xl-4 col-12">  
                        {
                        switchSign?
                        <SignIn setSwitchSign={setSwitchSign} setSwitchLogIn={props.setSwitchLogIn}/>
                        :
                        <SingUp setSwitchSign={setSwitchSign} setSwitchLogIn={props.setSwitchLogIn}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingInAndSingUp;