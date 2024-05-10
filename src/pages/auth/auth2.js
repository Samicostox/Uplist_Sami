/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
  *


*/

import React from 'react';
import style from './auth.module.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from '../../request-model/services/auth.service';
import { useNavigate } from 'react-router-dom';
import TokenService from '../../request-model/services/token.service';
import { useEffect } from 'react';

const initialValues = {
    username: "",
    password: "",
};


export default function Auth2(props) {

    const [formInput, setformInput] = useState(initialValues);
  const [buttonLock, setButtonLock] = useState(false);
  const [showForgotPasswordLink, setShowForgotPasswordLink] = useState(false);
  const test = "test"





  let navigate = useNavigate();

  useEffect (() => {
    if (TokenService.getUser()) {
      navigate("/")
    }

  }, [navigate])

  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setformInput({
        ...formInput,
        ...formInput.username,
        [name] : value,
    });

  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setformInput({
        ...formInput,
        ...formInput.password,
        [name] : value,
    });

  }


  const handleSubmitform = async(e) => {
    e.preventDefault();
    if (buttonLock) return;
    setButtonLock(true);
    if (formInput.username.includes(" ")) {
      props.errorCallback("Username cannot contain spaces");
      return;
    }

    try{
      const signInResponse = await AuthService.login(formInput.username, formInput.password);

      if (signInResponse.status === 200) {
        if (signInResponse.data.is_linkpage_empty) navigate("/biolink/" + signInResponse.data.username + "/edit");
        else navigate("/biolink/" + signInResponse.data.username);

        // props.successCallback("Logged in successfully") 
        return// TODO maybe remove login success message, it's not really necessary
      }else {
        props.errorCallback("Error Logging in")
      }
    }catch(error) {
      console.log("sign in error: ",error);
      props.errorCallback("Error logging in");
      setShowForgotPasswordLink(true);
    }
    setButtonLock(false);
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
              <form onSubmit={handleSubmitform} className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id = "username"
                      name = "username"
                      autoComplete="username"
                      placeholder = "Username"
                      required
                      value = {formInput.username}
                      onChange = {handleUsernameChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      id = "password"
                      name = "password"
                      value = {formInput.password}
                      onChange = {handlePasswordChange}
                      placeholder = "Password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
  
                <div className="flex items-center justify-between ">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                      Remember me
                    </label>
                  </div>
  
                  <div className="text-sm leading-6">
                    <a href="forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
  
            </div>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign Up for Free!
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  