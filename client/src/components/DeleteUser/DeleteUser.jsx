import { useSelector } from 'react-redux';
import './DeleteUser.css';

const DeleteUser = (props) => {
const user = useSelector(state => state.user)
const [switchSpinner, setSwitchSpinner] = props.useState(false)
const [userDeleteSuccess, setUserDeleteSuccess] = props.useState(false)
const [yesOrNo , setYesOrNo] = props.useState(true)
const timeSpinner = () => {
    setTimeout(()=>{
        setSwitchSpinner(false)
        setUserDeleteSuccess(true)
    },2000)
    if(props.switchDelete.message){
        setTimeout(()=>{
            props.setSwitchDelete({...props.switchDelete,boolean:false})
        },4000)}
};
const reloadTimeSpinner= () => {
    setSwitchSpinner(true)
    setUserDeleteSuccess(false)
    timeSpinner()
}
    return(
        <div class="position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center" >
            <div className="bg-white border border-1 border-secondary rounded p-3 pt-0 w-25" >
                <div className="col-12 d-flex justify-content-end pb-2">
                        <button className="border-0 bg-white text text-secondary fs-6" onClick={()=>props.setSwitchDelete({...props.switchDelete,boolean:false})}>x</button>
                </div>
                    <div className="col-12 text-center">
                        <h4 className="text">Are you sure you want to delete your account?</h4>
                    </div>
                {
                switchSpinner?
                <div className="col-12 text-center my-3">
                    <div class="spinner-border text-dark" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
                null
                }
                {
                  userDeleteSuccess?
                  <div className="col-12 text-center">
                    <h5 className={`${props.switchDelete.message?'text-success':'text-danger'} text my-3`}>
                    {props.switchDelete.message?props.switchDelete.message : props.switchDelete.messageError} 
                    {props.switchDelete.message?<i class="bi bi-check-lg fs-3"></i> : <i class="bi bi-exclamation-circle-fill fs-3 ms-2"></i>}
                    </h5>
                    {
                        props.switchDelete.messageError?
                            <div className="d-flex justify-content-center">
                                <button 
                                id="id_btn_retry" 
                                type="button" 
                                className="btn btn-outline-dark px-2 py-0 d-flex align-items-center"
                                onClick={()=>{props.setSwitchDelete({...props.switchDelete, messageError:'', message:''}); props.switchDelete.yes(); reloadTimeSpinner()}}
                                >
                                    <span className="text me-1">Retry</span>
                                    <i id='id_retry' class="bi bi-arrow-repeat text-success fs-4 "></i>
                                </button>
                            </div>
                        :
                        null
                    }
                  </div>  
                    :
                    null
                }
                {
                yesOrNo?
                <div className="col-12 d-flex justify-content-center mt-3 mb-2">
                    <button className="btn text btn-outline-success rounded-3 me-4" onClick={()=>{ props.switchDelete.yes(); setSwitchSpinner(true); timeSpinner(); setYesOrNo(false);}}>Yes</button>
                    <button className="btn text btn-outline-danger rounded-3" onClick={props.switchDelete.no} >No </button>
                </div>
                :
                null
                }
            </div>
        </div>
    )
}

export default DeleteUser;