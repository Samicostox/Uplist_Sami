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

const ResetPassword2 = (props) => {
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
            <>
            {/*
              This example requires updating your template:
      
              ```
              <html class="h-full bg-gray-50">
              <body class="h-full">
              ```
            */}
           
           <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-6 lg:px-8 flex-col" >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                  className="mx-auto h-32 w-auto "
                  src="https://res.cloudinary.com/dl2adjye7/image/upload/v1715330543/UPlist_1_jiu2cp.png"
                  alt="Your Company"
                />
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>
      
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-6 py-12 shadow-lg rounded-lg sm:px-10">
                  <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                        Email Address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id = "email"
                          name = "email"
                          autoComplete="email"
                          placeholder = "Email"
                          value={formInput.email} 
                          onChange={handleEmailChange}
                          required
                         
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
      
                  
      
                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Send Email
                      </button>
                    </div>
                  </form>
      
                </div>
      
                <p className="mt-10 text-center text-sm text-gray-500">
                  Remenber your password?{' '}
                  <a href="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </>

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
            <>
            {/*
              This example requires updating your template:
      
              ```
              <html class="h-full bg-gray-50">
              <body class="h-full">
              ```
            */}
           
           <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-6 lg:px-8 flex-col" >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                  className="mx-auto h-32 w-auto "
                  src="https://res.cloudinary.com/dl2adjye7/image/upload/v1715330543/UPlist_1_jiu2cp.png"
                  alt="Your Company"
                />
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Verification code Sent
                </h2>
                
              </div>
      
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-6 py-12 shadow-lg rounded-lg sm:px-10">
          
                
                    <button
                        onClick={handleSendAgain}
                        
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Send Again
                      </button>
                      <div className="mt-2">
                        <span>Didn't receive the email? send again in: </span>
                       
                        <span className={style.timer}>{timer}s</span>
                    </div>
                  
      
                </div>
      
                <p className="mt-10 text-center text-sm text-gray-500">
                  Remenber your password?{' '}
                  <a href="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </>
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

export default ResetPassword2;





