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

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import AuthService from "../../../request-model/services/auth.service";
import TokenService from "../../../request-model/services/token.service";
import { useEffect } from 'react';
import SliderToggle  from './switch';
import Toggle from './switch';

const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    artistType: "dj",
  };


export default function SignUp(props) {

  const [formInput, setformInput] = useState(initialValues);
  const [buttonLock, setButtonLock] = useState(false);
  const [showForgotPasswordLink, setShowForgotPasswordLink] = useState(false);
  const test = "test"

  const [selected, setSelected] = useState("users");







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
      [name]: value,
    });
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setformInput({
      ...formInput,
      ...formInput.email,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setformInput({
      ...formInput,
      ...formInput.password,
      [name]: value,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const { name, value } = e.target;
    setformInput({
      ...formInput,
      ...formInput.confirm_password,
      [name]: value,
    });
  };

  const handleArtistTypeChange = (e) => {
    const value = e.target.value;
    setformInput({
      ...formInput,
      ...formInput.artistType,
      artistType: value,
    });
  };


  const handleSubmitform = async (e) => {
    e.preventDefault();
    if (formInput.password !== formInput.confirm_password) {
        props.errorCallback("Password and Confirm Password is not the same");
        return;
      }
    // send over sign up to backend
    try {
      const resp = await AuthService.register(
        formInput.username,
        formInput.email,
        formInput.password
      );

      if (resp.status === 201) {
        navigate("/auth/login");
        props.successCallback("Account created successfully"); // TODO maybe remove account created successfully, its not really needed
      } else {
        props.errorCallback("Error creating account");
      }
    } catch (error) {
      console.log("error: ", error);
      let errorMessage = "Error creating account";

      if (error?.response?.data?.username) {
        errorMessage = error?.response?.data?.username;
      } else if (error?.response?.data?.email) {
        errorMessage = error?.response?.data?.email;
      } else if (error?.response?.data?.password) {
        errorMessage = error?.response?.data?.password;
      }
      props.errorCallback(errorMessage);
    }
  };
  
  const handleSubmitform2 = async (e) => {
    
    e.preventDefault();
    if (formInput.password !== formInput.confirm_password) {
        props.errorCallback("Password and Confirm Password is not the same");
        return;
      }

    console.log( formInput.username)
    console.log( formInput.email)
    console.log( formInput.password)
    console.log( formInput.artistType)
    // send over sign up to backend
    try {
      const resp = await AuthService.register(
        formInput.username,
        formInput.email,
        formInput.password,
        formInput.artistType
      );

      if (resp.status === 201) {
        navigate("/auth/login");
        props.successCallback("Account created successfully"); // TODO maybe remove account created successfully, its not really needed
      } else {
        props.errorCallback("Error creating account");
      }
    } catch (error) {
      console.log("error: ", error);
      let errorMessage = "Error creating account";

      if (error?.response?.data?.username) {
        errorMessage = error?.response?.data?.username;
      } else if (error?.response?.data?.email) {
        errorMessage = error?.response?.data?.email;
      } else if (error?.response?.data?.password) {
        errorMessage = error?.response?.data?.password;
      }else if (error?.response?.data?.artistType) {
        console.log("error here")
        errorMessage = error?.response?.data?.artistType;
      }
      props.errorCallback(errorMessage);
    }
  };

  
   
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
            <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 mb-6">
              Create an Account
            </h2>
          </div>
          <Toggle selected={selected} setSelected={setSelected} />
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-6 py-12 shadow-lg rounded-lg sm:px-10">
        <form onSubmit={selected === "artist" ? handleSubmitform2 : handleSubmitform} className="space-y-6" method="POST">
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
                      value={formInput.username}
                      onChange={handleUsernameChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id = "email"
                      name = "email"
                      autoComplete="email"
                      placeholder = "Email"
                      required
                      value={formInput.email}
                      onChange={handleEmailChange}
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
                      value={formInput.password}
                      onChange={handlePasswordChange}
                      placeholder = "Password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                     type="password"
                     id="confirm_password"
                     name="confirm_password"
                     value={formInput.confirm_password}
                     onChange={handleConfirmPasswordChange}
                     placeholder="Confirm Password"
                     data-testid="confirm_password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {selected === "artist" && (
                <div>
                  <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                    Please Select...
                  </label>
                  <select
                    id="location"
                    name="location"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue="Artist Type"
                    value={formInput.artistType}
                    onChange={handleArtistTypeChange}
                    data-testid="artist_type_select"
                  >
                    <option value="dj">DJ</option>
                    <option value="music artist">Music Artist</option>
                    
                  </select>
                </div>
              )}

                
  
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
                    Sign Up
                  </button>
                </div>
              </form>
  
            </div>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{' '}
              <a href="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  