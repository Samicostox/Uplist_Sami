import React, { useEffect } from "react";
import styleform from "../auth.module.css";
import style from "./signUp.module.css";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../request-model/services/auth.service";
import TokenService from "../../../request-model/services/token.service";
import UserService from "../../../request-model/services/user.service";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  artistType: "",
};

function SignUp(props) {
  let params = useParams();

  const navigate = useNavigate();

  const [formInput, setformInput] = useState(initialValues);
  const [currentStage, setCurrentStage] = useState(1);

  useEffect(() => {
    if (TokenService.getUser()) {
      console.log("user already logged in");
      navigate("/");
    } else {
      console.log("user not logged in");
    }

    //decode query string
    // encoded with base64
    if (!params.query) {
      setCurrentStage(1);
    } else {
      const decoded = atob(params.query);
      // seperate on &
      const split = decoded.split("&");

      // find username, email and password
      const username = split[0];
      const email = split[1];
      const password = split[2];

      let usernameInQuery = false;
      let emailInQuery = false;
      let passwordInQuery = false;
      // check if username, email and password fields are their
      if (username && username.split("=")[0] === "username") {
        usernameInQuery = true;
      } else {
        console.log("query param not found or not recognised");
      }
      if (email && email.split("=")[0] === "email") {
        emailInQuery = true;
      } else {
        console.log("query param not found or not recognised");
      }
      if (password && password.split("=")[0] === "password") {
        passwordInQuery = true;
      } else {
        console.log("query param not found or not recognised");
      }

      // if all 3 are there, go to stage 3
      if (usernameInQuery && emailInQuery && passwordInQuery) {
        setCurrentStage(3);
        setformInput((formInput) => ({
          ...formInput,
          username: username.split("=")[1],
          email: email.split("=")[1],
          password: password.split("=")[1],
        }));
      } else if (usernameInQuery && emailInQuery) {
        setCurrentStage(2);
        setformInput((formInput) => ({
          ...formInput,
          username: username.split("=")[1],
          email: email.split("=")[1],
        }));
      } else {
        setCurrentStage(1);
      }
    }
  }, [navigate, params.query]);

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

  const handleStage1Submit = async (e) => {
    e.preventDefault();

    // check if username and email is empty
    // if empty, return error
    // else, continue to stage 2
    if (formInput.username === "" || formInput.email === "") {
      props.errorCallback("Username or Email cannot be empty");
      return;
    }

    try {
      const resp = await UserService.getLinkpage(formInput.username);
      if (resp.status === 200) {
        props.errorCallback("Username already exists");
        return;
      }
    } catch (error) {}

    const navigateQuery = btoa(
      `username=${formInput.username}&email=${formInput.email}`
    );
    navigate(`/auth/sign-up/${navigateQuery}`);
  };

  const handleStage2Submit = async (e) => {
    e.preventDefault();
    //check if the password and confirm password is the same
    // if not, return error
    // else, continue to stage 3
    if (formInput.password !== formInput.confirm_password) {
      props.errorCallback("Password and Confirm Password is not the same");
      return;
    }
    if (formInput.password.length < 8) {
      props.errorCallback("Password must be at least 8 characters");
      return;
    }
    const navigateQuery = btoa(
      `username=${formInput.username}&email=${formInput.email}&password=${formInput.password}`
    );
    navigate(`/auth/sign-up/${navigateQuery}`);
  };

  const handleStage3BusinessSubmit = () => {
    // move to stage 4
    setCurrentStage(4);
  };

  const handleStage4Submit = async () => {
    if (formInput.artistType === "") {
      props.errorCallback("Please select an artist type");
      return;
    }

    try {
      const resp = await AuthService.register(
        formInput.username,
        formInput.email,
        formInput.password,
        formInput.artistType
      );
      if (resp.status === 201) {
        props.successCallback("Account created successfully"); // TODO maybe remove account created successfully, its not really needed
        navigate("/auth/login");
      }
    } catch (error) {
      if (error.response.status === 400) {
        let errorMessage =
          error?.response?.data || "something went wrong. Please try again";
        if (error?.response?.data?.username) {
          errorMessage = error?.response?.data?.username;
        } else if (error?.response?.data?.email) {
          errorMessage = error?.response?.data?.email;
        } else if (error?.response?.data?.password) {
          errorMessage = error?.response?.data?.password;
        } else if (error?.response?.data?.artistType) {
          errorMessage = error?.response?.data?.artistType;
        }
        props.errorCallback(errorMessage);
      } else {
        console.log("error: ", error);
        props.errorCallback("Something went wrong. Please try again");
      }
    }
  };

  const renderStage1Form = () => {
    return (
      <div className={styleform.form_content}>
        <form onSubmit={handleStage1Submit}>
          <div className={styleform.form_label}>USERNAME</div>

          <input
            className={styleform.textbox}
            type="text"
            id="username"
            name="username"
            value={formInput.username}
            onChange={handleUsernameChange}
            placeholder="Username"
            data-testid="username"
            autoFocus
          ></input>

          <div className={styleform.form_label}>EMAIL</div>

          <input
            className={styleform.textbox}
            type="email"
            id="email"
            name="email"
            value={formInput.email}
            onChange={handleEmailChange}
            placeholder="Email"
            data-testid="email"
          ></input>

          <div className={styleform.continue_button_container}>
            <button className={styleform.continue_button} type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderStage2Form = () => {
    return (
      <div className={styleform.form_content}>
        <form onSubmit={handleStage2Submit}>
          <div className={styleform.form_label}>PASSWORD</div>

          <input
            className={styleform.textbox}
            type="password"
            id="password"
            name="password"
            value={formInput.password}
            onChange={handlePasswordChange}
            placeholder="Password"
            data-testid="password"
            autoFocus
          ></input>

          <div className={styleform.form_label}>CONFIRM PASSWORD</div>

          <input
            className={styleform.textbox}
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formInput.confirm_password}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm Password"
            data-testid="confirm_password"
          ></input>

          <div className={styleform.continue_button_container}>
            <button className={styleform.continue_button} type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderStage3Form = () => {
    return (
      <div className={styleform.form_content}>
        <div className={style.buttons_container}>
          <div className={style.account_type_button_container}>
            <button
              className={`${style.account_type_button} ${style.personal}`}
              onClick={handleSubmitform}
            >
              Customer
            </button>
          </div>

          <div className={style.account_type_button_container}>
            <button
              className={`${style.account_type_button} ${style.business}`}
              onClick={handleStage3BusinessSubmit}
            >
              Artist
            </button>
          </div>
        </div>
      </div>
    );
  };

  // artist type selector
  const renderStage4Form = () => {
    return (
      <div className={styleform.form_content}>
        <div className={style.sub_title}>Type of Artist</div>

        <div className={style.select_container}>
          <select
            className={style.select}
            value={formInput.artistType}
            onChange={handleArtistTypeChange}
            data-testid="artist_type_select"
            required
          >
            <option
              value=""
              disabled
              selected
              hidden
              className={style.placeholder_option}
            >
              Please Select...
            </option>
            <option value="dj" className={style.option}>
              DJ
            </option>
            <option value="music artist" className={style.option}>
              Music Artist
            </option>
            {/* <option value="Performer" className={style.option}>Performer</option>
            <option value="Band" className={style.option}>Band</option> */}
          </select>
        </div>

        <div className={styleform.continue_button_container}>
          <button
            className={styleform.continue_button}
            onClick={handleStage4Submit}
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  const stageRenderer = (currentStage) => {
    switch (currentStage) {
      case 1:
        return <>{renderStage1Form()}</>;
      case 2:
        return renderStage2Form();
      case 3:
        return renderStage3Form();
      case 4:
        return renderStage4Form();
      default:
        return renderStage1Form();
    }
  };

  const renderSignUpform = () => {
    return (
      <>
        <div className={styleform.form}>
          <div className={styleform.form_title}>Create an account</div>

          {stageRenderer(currentStage)}
          <NavLink className={styleform.link} to="/auth/login">
            Already have an account?{" "}
            <span className={styleform.link_red}> Sign In here! </span>
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <div className={styleform.auth} data-testid="sign-up">
      {renderSignUpform()}
    </div>
  );
}

export default SignUp;
