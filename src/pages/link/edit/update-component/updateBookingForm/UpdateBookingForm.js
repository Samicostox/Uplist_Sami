import React from 'react';
import { useState, useEffect } from 'react';
import style from '../../form.module.css';
import UserService from '../../../../../request-model/services/user.service';








function UpdateBookingForm(props) {




    const [module_form_class, setModuleFormClass] = useState(style.module_form);

    const [bookingInfo, setBookingInfo] = useState("");
    const [allowBookings, setAllowBookings] = useState(undefined);
    useEffect(() => {
        if (props.changed === "left"){
            setModuleFormClass(style.module_form + " " + style.left);
        }else if (props.changed === "right"){
            setModuleFormClass(style.module_form + " " + style.right);
        }
        
    }, [props.changed])

  


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await UserService.getStripeConnection(props.userId);
                if (resp.status === 200){
                    setBookingInfo(resp.data.service_info);
                    setAllowBookings(resp.data.is_active);
                }
            }
            catch (error) {
                console.log("error: ",error)
            }
        }

        fetchData();
    }, [props.userId])



    

    const renderBookingsForm = () => {

        const handleBookingInfoChange = (e) => {
            setBookingInfo(e.target.value);

        };

        const handleManageStripeButton = async (e) => {
            e.preventDefault();
            try {
                const resp = await UserService.manageStripeAccount(props.userId);
                console.log("resp: ",resp)
                if (resp.status === 200){
                    // get redirect url
                    let redirectUrl = resp.data.redirect;
                    // redirect to redirectUrl
                    Object.assign(document.createElement('a'), {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        href: redirectUrl,
                    }).click();
                }
            }
            catch (error) {
                console.log("error: ",error)
                if (error?.response?.status === 401){
                    props.errorCallback("Can't access resource - Unauthorised");
                }else {
                    props.errorCallback("Something went wrong, please refresh and try again");
                }
            }
        }

        const handleBookingInfoSave = async (e) => {
            e.preventDefault();
            if (!bookingInfo){
                props.errorCallback("Please enter some information about your booking");
                return;
            }
            
            try {
                const resp = await UserService.setStripeConnection(props.userId, bookingInfo, allowBookings);
                if (resp.status === 200){
                    props.successCallback("Booking settings saved");
                    props.onUpdateCallback();
                    props.onClose();
                }
            }
            catch (error) {
                console.log("error: ",error)
            }
        }

        const handleAllowBookingsChange =  (e) => {
            setAllowBookings(e.target.checked);
        };


        const handleBookingInfoCancel = async (e) => {
            e.preventDefault();
            props.onClose();
        }

        return (
<>
                <div className={style.module_header}>
                    <h3>Allow users to book your services!</h3>
                </div>

                <form>
            
                    <div className={style.module_form_input}>
                        <label>Allow Bookings</label>
                        {/* check box */}
                        <input  
                            type="checkbox"
                            name="allowBookings"
                            checked={allowBookings}
                            onChange={handleAllowBookingsChange}

                        />

                        <label>Service Info</label>
                        {/* text box */}
                        <textarea
                            className={style.module_form_textarea}
                            name="bookingInfo"
                            value={bookingInfo}
                            onChange={handleBookingInfoChange}
                            placeholder="Please enter here information about your booking. Include details about the different services you offer, the expected price ranges, and information regarding travel and location. Feel free to include any other information that you feel is relevant for the user"
                            // rows="10"
                            cols="50"
                            required
                        />

                    </div>

                   
                    <div className={style.manage_stripe_button}>
                        <button className={style.module_form_button + " " + style.save} type="button" onClick={handleManageStripeButton}>Payment Dashboard</button>
                    </div>
                    <div className={style.module_form_buttons}>
                    
                        <button className={style.module_form_button + " " + style.cancel} type="button" onClick={handleBookingInfoCancel}>Cancel</button>
                        <button className={style.module_form_button + " " + style.save} type="submit" onClick={handleBookingInfoSave}>Save</button>
                    </div>
                </form>
            </ >  
        )
    }


    return (
        <div className={style.module_container}>
            <div className={module_form_class}>
                {renderBookingsForm()}
            </div>
        </div>        
        )

}

export default UpdateBookingForm;
