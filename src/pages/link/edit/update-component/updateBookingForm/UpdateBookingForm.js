import React from "react";
import { useState, useEffect } from "react";
import style from "../../form.module.css";
import UserService from "../../../../../request-model/services/user.service";

function UpdateBookingForm(props) {
  const [module_form_class, setModuleFormClass] = useState(style.module_form);

  const [bookingInfo, setBookingInfo] = useState("");
  const [allowBookings, setAllowBookings] = useState(undefined);
  useEffect(() => {
    if (props.changed === "left") {
      setModuleFormClass(style.module_form + " " + style.left);
    } else if (props.changed === "right") {
      setModuleFormClass(style.module_form + " " + style.right);
    }
  }, [props.changed]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await UserService.getStripeConnection(props.userId);
        if (resp.status === 200) {
          setBookingInfo(resp.data.service_info);
          setAllowBookings(resp.data.is_active);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchData();
  }, [props.userId]);

  const renderBookingsForm = () => {
    const handleBookingInfoChange = (e) => {
      setBookingInfo(e.target.value);
    };

    const handleManageStripeButton = async (e) => {
      e.preventDefault();
      try {
        const resp = await UserService.manageStripeAccount(props.userId);
        console.log("resp: ", resp);
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
      if (!bookingInfo) {
        props.errorCallback("Please enter some information about your booking");
        return;
      }

      try {
        const resp = await UserService.setStripeConnection(
          props.userId,
          bookingInfo,
          allowBookings
        );
        if (resp.status === 200) {
          props.successCallback("Booking settings saved");
          props.onUpdateCallback();
          props.onClose();
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };

    const handleAllowBookingsChange = (e) => {
      setAllowBookings(e.target.checked);
    };

    const handleBookingInfoCancel = async (e) => {
      e.preventDefault();
      props.onClose();
    };

    return (
      <div className="flex justify-center items-center">
        <div className="w-full max-w-xl bg-white rounded-lg">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-medium">
              Allow users to book your services!
            </h3>
          </div>

          <form>
            <div className="mb-4">
              <label className="block text-lg font-medium">
                Allow Bookings
              </label>
              <input
                type="checkbox"
                name="allowBookings"
                checked={allowBookings}
                onChange={handleAllowBookingsChange}
              />

              <label className="block text-lg font-medium mt-4">
                Service Info
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                name="bookingInfo"
                value={bookingInfo}
                onChange={handleBookingInfoChange}
                placeholder="Please enter here information about your booking. Include details about the different services you offer, the expected price ranges, and information regarding travel and location. Feel free to include any other information that you feel is relevant for the user"
                cols="50"
                required
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded transition ease-in-out duration-200 hover:bg-green-700"
                type="button"
                onClick={handleManageStripeButton}
              >
                Payment Dashboard
              </button>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-black text-white py-2 px-4 rounded transition ease-in-out duration-200 hover:bg-gray-700"
                type="button"
                onClick={handleBookingInfoCancel}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded transition ease-in-out duration-200 hover:bg-blue-700"
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

  return (
    <div className={style.module_container}>
      <div className={module_form_class}>{renderBookingsForm()}</div>
    </div>
  );
}

export default UpdateBookingForm;
