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

function Auth(props) {

  

  const [formInput, setformInput] = useState(initialValues);
  const [buttonLock, setButtonLock] = useState(false);
  const [showForgotPasswordLink, setShowForgotPasswordLink] = useState(false);





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

  const renderLoginform = () => { 
  
    return (
      <div className={style.form}> 
        <div className={style.form_title}>
          Login to Your Account
        </div>

        <div className={style.form_subtitle}>
        Login to your uplist account to get started
        </div>
        <form onSubmit={handleSubmitform}>

          <div className={style.form_label}>
            USERNAME / EMAIL ADDRESS
          </div>

          <input 
                        className = {style.textbox}
                        type="text"
                        id = "username"
                        name = "username"
                        value = {formInput.username}
                        onChange = {handleUsernameChange}
                        placeholder = "Username">

          </input>


          <div className={style.form_label}>
            PASSWORD 
          </div>

          <input 
                      className = {style.textbox}
                      type="password"
                      id = "password"
                      name = "password"
                      value = {formInput.password}
                      onChange = {handlePasswordChange}
                      placeholder = "Password">

          </input>

          <div  className = {style.continue_button_container}>
            <button className = {style.continue_button} type='submit'>
              Continue
            </button>
          </div>
        </form>

      

    

      <NavLink className={style.link} to = "/auth/sign-up">
        Dont have an account? <span className={style.link_red} > Sign up here </span>
      </NavLink>

      <br />
      {showForgotPasswordLink &&
        <NavLink className={style.link} to = "/auth/forgot-password">
          Forgot your password? <span className={style.link_red} > Reset it here </span>
        </NavLink>
      }
    </div>
      
    )
  }

  

  return (
    <div className={style.auth}>
        {renderLoginform()}
    </div>
  )
}

export default Auth;