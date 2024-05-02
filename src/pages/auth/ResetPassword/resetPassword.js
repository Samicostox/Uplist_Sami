import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthCode from 'react-auth-code-input';
import style from './resetPassword.module.css';
import { AiOutlineMail } from 'react-icons/ai';
import AuthService from '../../../request-model/services/auth.service';


const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    token: "",
}

const ResetPassword = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();


    const [formInput, setformInput] = useState(initialValues);
    
    const [screen, setScreen] = useState(1);

    const [token, setToken] = useState("");
    const [uidb64, setUidb64] = useState("");
    const [buttonLock, setButtonLock] = useState(false);

    useEffect(() => {
        let token = searchParams.get("token");
        let uidb64 = searchParams.get("uidb64");
        console.log(token, uidb64);
        if (token && uidb64) {
            setToken(token);
            setUidb64(uidb64);
            setScreen(3);
        }
    }, [searchParams])
    
    const [timer , setTimer] = useState(60);


    const handleSubmit =  async(e) => {
        e.preventDefault();
        if (buttonLock) return;
        setButtonLock(true);

        try {
            let resp = await AuthService.forgotPassword(formInput.email);
            if (resp.status === 200) {
                setButtonLock(false);
                setTimer(60);
                setScreen(2);
                return true;
            }
        } catch (err) {
            if (err.response.status === 404) {
                props.errorCallback("Email not found");
            }
            else {
                props.errorCallback("Something went wrong, please try again later");
            }
            return false;
        }
        setButtonLock(false);
    }

    const chooseEmailScreen = () => {

        const handleEmailChange = (e) => {
            const { name, value } = e.target;
            setformInput({
                ...formInput,
                ...formInput.email,
                [name] : value,
            });
    
        }
        
        return (
            <div className={style.screen_container}>
                <div className={style.screen_content}>
                    <h1>Reset Password</h1>
                    <p>Enter your email address and we will send you a Verification Code.</p>
                    <form onSubmit={handleSubmit}>
                        <input className = {style.input_field} type="email" name="email" placeholder="Email address" value={formInput.email} onChange={handleEmailChange} autoFocus/>
                        <button className = {style.input_button} type="submit">Continue</button>
                    </form>
                </div>
            </div>

        )
    }

    
    useEffect(() => {
        if (timer <= 0) {
            setButtonLock(false);
            
        } else {
            const intervalId = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [timer])


    const otpScreen = () => {

        const handleSendAgain = (e) => {
            e.preventDefault();
            if (buttonLock) return;
            if (timer > 0) return;
            if (handleSubmit(e)) {
                props.successCallback("Verification Email sent");
            }
        }

        return (    
            <div className={style.screen_container}> 
                <div className={style.screen_content}>
                    <div className={style.icon_container}>
                        <AiOutlineMail className={style.icon} />
                    </div>
                    <h1>Verification code Sent</h1>
                    <p>We have sent a verification link to your email address. Please follow the instructions sent. This may take up to a minute</p>
                    {/* send again button */}
                    <div className={style.send_again_text}>
                        <span>Didn't receive the email? send again in:</span>
                        <br />
                        <span className={style.timer}>{timer}s</span>
                    </div>
                
                    <button className={style.input_button} onClick={handleSendAgain}>Send Again</button>

                </div>

            </div>
        )
    }

    const NewPasswordScreen = () => {

        const handlePasswordChange = (e) => {
            const { name, value } = e.target;
            setformInput({
                ...formInput,
                ...formInput.password,
                [name] : value,
            });

        }

        const handleConfirmPasswordChange = (e) => {
            const { name, value } = e.target;
            setformInput({
                ...formInput,
                ...formInput.confirmPassword,
                [name] : value,
            });

        }

        const handlePasswordSubmit = async(e) => {
            e.preventDefault();
            
            if (formInput.password !== formInput.confirmPassword) {
                props.errorCallback("Passwords do not match");
                return;
            }

            try {
                let resp = await AuthService.resetPassword(formInput.password, token, uidb64);
                if (resp.status === 200) {
                    props.successCallback("Password reset successfully");
                    props.history.push("/login");
                }
            }
            catch (err) {
                if (err.response.status === 404) {
                    props.errorCallback("Email not found");
                }
                else {
                    props.errorCallback("Something went wrong, please try again later");
                }
            }

        }

        return (
            <div className={style.screen_container}>
                <div className={style.screen_content}>
                    <h1>Reset Password</h1>
                    <p>Enter your new password below.</p>
                    <form onSubmit={handlePasswordSubmit}>
                        <input  className = {style.input_field} type="password" name="password" placeholder="Password" value={formInput.password} onChange={handlePasswordChange} autoFocus />

                        <input  className = {style.input_field} type="password" name="confirmPassword" placeholder="Confirm Password" value={formInput.confirmPassword} onChange={handleConfirmPasswordChange} />

                        <button className = {style.input_button} type="submit">Continue</button>
                    </form>
                </  div>
            </div>
        )

    }

    const ScreenRenderer = (screen) => {
        switch(screen) {
            case 1:
                return chooseEmailScreen();
            case 2:
                return otpScreen();
            case 3:
                return NewPasswordScreen();
            default:
                return chooseEmailScreen();
        }
    }

    return (
        <div className={style.ResetPassword}>
            {ScreenRenderer(screen) }   
        </div>
    )
}

export default ResetPassword;





