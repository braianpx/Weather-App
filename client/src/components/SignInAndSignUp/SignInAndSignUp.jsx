import { useState } from "react";
import SignIn from "../SignIn/SignIn";
import SingUp from "../SingUp/SingUp";
import { useSelector } from "react-redux";
import './SignInAndSignUp.css'

const SingInAndSingUp = (props) =>{

const [switchSign, setSwitchSign] = useState(true)
const user = useSelector(state=> state.user)
    return(
        <div id='id-div-conteiner-sign' class="position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-4">  
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