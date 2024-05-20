import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import style from "../../form.module.css";
import UserService from "../../../../../request-model/services/user.service";
import FadeLoader from "react-spinners/FadeLoader";

const initialValues = {
  bookingInfo: "",
};

function AddBookingForm(props) {
  const [formInput, setFormInput] = useState(initialValues);
  const [module_form_class, setModuleFormClass] = useState(style.module_form);
  // loading state can be: start, loading, success, error
  const [formLoadingState, setFormLoadingState] = useState("loading");

  useEffect(() => {
    if (props.changed === "left") {
      setModuleFormClass(style.module_form + " " + style.left);
    } else if (props.changed === "right") {
      setModuleFormClass(style.module_form + " " + style.right);
    }
  }, [props.changed]);

  const [stripeConnected, setStripeConnected] = useState(false);

  const fetchData = useCallback(async () => {
    setFormLoadingState("loading");
    // // see if user is connected to stripe
    try {
      const res = await UserService.checkOnboarded();
      if (res.status === 200) {
        try {
          const resp = await UserService.getStripeConnection(props.userId);
          if (resp.status === 200) {
            setFormInput((formInput) => ({
              bookingInfo: resp.data.service_info,
              allowBookings: resp.data.is_active,
            }));
          }
          setStripeConnected(true);
        } catch (err) {
          console.log("err: ", err);
        }
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        if (err.response.data.detail === "Stripe connection does not exist") {
          setStripeConnected(false);
        }
        if (err.response.data.detail === "Stripe onboarding incomplete") {
          setStripeConnected(false);
        }
      }
    }
    setFormLoadingState("loaded");
  }, [props.userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddStripeConnection = async () => {
    try {
      const resp = await UserService.connectStripe(props.userId);
      console.log("resp: ", resp);
      if (resp.status === 200) {
        // onboarding stripe account,
        try {
          const resp = await UserService.onboardStripeAccount();
          console.log("resp: ", resp);
          if (resp.status === 200) {
            // get redirect url
            let redirectUrl = resp.data.redirect;
            // redirect to redirectUrl

            window.location.replace(redirectUrl);
          }
        } catch (error) {
          console.log("error: ", error);
          if (error?.response?.status === 401) {
            props.errorCallback("Can't access resource - Unauthorised");
          } else {
            props.errorCallback(
              "Something went wrong, please refresh and try again"
            );
          }
        }
      }
    } catch (error) {
      console.log("error creating stripe connection: ", error.response.data);

      if (error?.response?.status === 401) {
        props.errorCallback("Can't access resource - Unauthorised");
      } else if (
        error.response.data === "You already have a Stripe connection"
      ) {
        setStripeConnected(false);
        // check onboarding status
        const res = await UserService.onboardStripeAccount();
        if (res.status === 200) {
          // get redirect url
          let redirectUrl = res.data.redirect;
          // redirect to redirectUrl
          window.location.replace(redirectUrl);
        }
      } else {
        props.errorCallback(
          "Something went wrong, please refresh and try again"
        );
      }
    }
    fetchData();
  };

  const renderBookingsForm = () => {
    const handleBookingInfoChange = (e) => {
      setFormInput({
        ...formInput,
        [e.target.name]: e.target.value,
      });
    };

    const handleManageStripeButton = async (e) => {
      e.preventDefault();
      try {
        const resp = await UserService.manageStripeAccount(props.userId);
        if (resp.status === 200) {
          // get redirect url
          let redirectUrl = resp.data.redirect;
          // redirect to redirectUrl
          Object.assign(document.createElement("a"), {
            target: "_blank",
            rel: "noopener noreferrer",
            href: redirectUrl,
          }).click();
        }
      } catch (error) {
        console.log("error: ", error);
        if (error?.response?.status === 401) {
          props.errorCallback("Can't access resource - Unauthorised");
        } else {
          props.errorCallback(
            "Something went wrong, please refresh and try again"
          );
        }
      }
    };

    const handleBookingInfoSave = async (e) => {
      e.preventDefault();
      if (!formInput.bookingInfo) {
        props.errorCallback(
          "Please enter some information about your services before saving"
        );
        return;
      }

      try {
        const resp = await UserService.setStripeConnection(
          props.userId,
          formInput.bookingInfo,
          formInput.allowBookings
        );
        if (resp.status === 200) {
          props.successCallback("Booking settings saved");
          props.onAddCallback();
          props.onClose();
        }
      } catch (error) {
        props.errorCallback(
          "Something went wrong, please refresh and try again"
        );
        console.log("error: ", error);
      }
    };

    const handleAllowBookingsChange = (e) => {
      setFormInput({
        ...formInput,
        [e.target.name]: e.target.checked,
      });
    };

    const handleBookingInfoCancel = async (e) => {
      e.preventDefault();
      if (!formInput.bookingInfo) {
        props.errorCallback(
          "Please enter some information about your services before leaving"
        );
        return;
      }

      try {
        fetchData();
      } catch (error) {
        console.log("error: ", error);
      }
      props.onClose();
    };

    return (
      <div className="flex justify-center items-center ">
        <div className="module_form  py-4 w-full max-w-md mx-auto bg-white rounded ">
          <div className="module_header text-center">
            <h3 className="text-2xl font-medium">
              Allow users to book your services!
            </h3>
          </div>

          <form>
            <div className="module_form_input my-4">
              <label className="block text-lg font-medium">
                Allow Bookings
              </label>
              <input
                type="checkbox"
                name="allowBookings"
                checked={formInput.allowBookings}
                onChange={handleAllowBookingsChange}
              />

              <label className="block text-lg font-medium mt-4">
                Service Info
              </label>
              <textarea
                className="module_form_textarea w-full p-2 border border-gray-300 rounded"
                name="bookingInfo"
                value={formInput.bookingInfo}
                onChange={handleBookingInfoChange}
                placeholder="Please enter here information about your booking. Include details about the different services you offer, the expected price ranges, and information regarding travel and location. Feel free to include any other information that you feel is relevant for the user"
                rows="10"
                cols="50"
                required
              />
            </div>

            <div className="manage_stripe_button flex justify-end mt-4">
              <button
                className="module_form_button bg-blue-500 text-white py-2 px-4 rounded transition ease-in-out duration-200 hover:bg-blue-700"
                type="button"
                onClick={handleManageStripeButton}
              >
                Payment Dashboard
              </button>
            </div>

            <div className="module_form_buttons flex justify-end mt-4">
              <button
                className="module_form_button bg-red-500 text-white py-2 px-4 rounded transition ease-in-out duration-200 hover:bg-red-700"
                type="button"
                onClick={handleBookingInfoCancel}
              >
                Cancel
              </button>
              <button
                className="module_form_button bg-blue-500 text-white py-2 px-4 rounded ml-4 transition ease-in-out duration-200 hover:bg-blue-700"
                type="submit"
                onClick={handleBookingInfoSave}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderConnectToStripe = () => {
    // render a button to connect to stripe
    return (
      <div className={style.addModule_container}>
        <div className={module_form_class}>
          <div className={style.module_header}>
            Add the ability to accept bookings and payments from users!
          </div>

          <button
            className={style.module_form_button + " " + style.save}
            type="button"
            onClick={handleAddStripeConnection}
          >
            Add
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {formLoadingState === "loading" ? (
        <div className={style.form_loading}>
          <FadeLoader className={style.loader} />
        </div>
      ) : (
        <>
          {stripeConnected ? (
            <>{renderBookingsForm()}</>
          ) : (
            <>{renderConnectToStripe()}</>
          )}
        </>
      )}
    </>
  );
}

export default AddBookingForm;
