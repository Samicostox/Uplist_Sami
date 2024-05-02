import React from "react";
import style from "./changePassword.module.css";
import AuthService from "../../../request-model/services/auth.service";
import { useOutSideClickAlert } from "../../../components/hooks/outsideClickHook";

const ChangePassword = (props) => {

    const [state, setState] = React.useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    })

    const handlePasswordChange = (event) => {
        setState({
            ...state,
            currentPassword: event.target.value,
        })
    }
    const handleNewPasswordChange = (event) => {
        setState({
            ...state,
            newPassword: event.target.value,
        })
    } 
    
    const handleConfirmNewPasswordChange = (event) => {
        setState({
            ...state,
            confirmNewPassword: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // check if new password and confirm new password are the same
        if (state.newPassword !== state.confirmNewPassword){
            props.errorCallback("Passwords do not match");
            return;
        }
        // check if new password is the same as current password
        if (state.newPassword === state.currentPassword){
            props.errorCallback("The new password cannot be the same as the current password");
            return;
        }
        
        // rest of the validation is server side
        // send request to server
        try {
            const resp = await AuthService.changePassword(state.newPassword);
            if (resp.status === 200){
                props.successCallback("Password changed successfully"); 

                props.closeCallback();

            }
        } catch (error) {
            props.errorCallback("Something went wrong, please try again later");

        }
    }

    const wrapperRef = React.useRef();
    useOutSideClickAlert(wrapperRef, props.closeCallback);

 
    return (
        <div className={style.changePassword} >
            <div className={style.changePassword_container} ref={wrapperRef}>
                <div className={style.changePassword_container_title}>
                Update your Password
                </div>
                <div className={style.changePassword_container_form}>
                    <form onSubmit={handleSubmit}>
                        <div className={style.changePassword_container_form_input}>
                            <label className={style.label}>Old Password</label>
                            <input type="password" required value={state.currentPassword} onChange={handlePasswordChange} />
                        </div>
                        <div className={style.changePassword_container_form_input}>
                            <label className={style.label}>New Password</label >
                            <input type="password" required value={state.newPassword} onChange={handleNewPasswordChange}/>
                        </div>
                        <div className={style.changePassword_container_form_input}>
                            <label className={style.label}>Confirm Password</label>
                            <input type="password" required  value={state.confirmNewPassword} onChange={handleConfirmNewPasswordChange}/>
                        </div>
                        <div className={style.changePassword_container_form_button}>
                            <button className={style.button} type="submit">Update </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
    }

    export default ChangePassword;