import React from "react";

import style from "./counterBooking.module.css";
import { useRef, useState } from "react";
import { useOutSideClickAlert } from "../../../components/hooks/outsideClickHook";

const CounterBooking = (props) => {


    const wrapperRef = useRef(null);
    useOutSideClickAlert(wrapperRef,props.onClose);

    const [priceField, setPriceField] = useState("£"+props.booking.enquiry.price);

    const onPriceFieldChange = (e) => {
        // make sure that the price has £ in front of it
        let newPrice = e.target.value;
        if (newPrice[0] !== "£") {
            newPrice = "£" + newPrice;
        }

        setPriceField(newPrice);
    }
    
    const handleCounterSubmit = () => {
        
        // remove the £ from the price
        let newPrice = priceField.slice(1);
        // round the price to 2 decimal places
        newPrice = Math.round(newPrice * 100) / 100;

        props.onCounter(newPrice);
    }
        
    


    return (
        <div className={style.counter_booking} data-testid = "counter-booking">
            <div className={style.counter_booking_container} ref={wrapperRef} >
                <div className={style.counter_booking_title}>
                    Counter Enquiry
                </div>

                <div className={style.current_enquiry_information}>
                    <div className={style.counter_enquiry_form_input_label}>
                        Start Date
                    </div>
                    <div className={style.current_enquiry_information_field}>
                        {props.booking.enquiry.start_datetime}
                    </div>

                    <div className={style.counter_enquiry_form_input_label}>
                        End Date
                    </div>
                    <div className={style.current_enquiry_information_field}>
                        {props.booking.enquiry.end_datetime}
                    </div>

                    <div className={style.counter_enquiry_form_input_label}>
                        Notes from Customer
                    </div>
                    <div className={style.current_enquiry_information_field}>
                        {props.booking.notes ? props.booking.notes : "No notes from customer"}
                    </div> 
                    
                </div>


                <div className={style.counter_enquiry_form}>
                    <div className={style.counter_enquiry_form_input}>
                        <div className={style.counter_enquiry_form_input_label}>
                            Change Price
                        </div>
                        <input type="text" className={style.counter_enquiry_form_input_field} placeholder="Enter your price here" value={priceField} onChange={onPriceFieldChange} ></input>
                    </div>
                    <div className={style.buttons}>
                        <div className={style.counter_enquiry_form_button}>
                            <button className={style.button + " " + style.send} onClick={handleCounterSubmit}>Send</button>
                        </div>
                        <div className={style.counter_enquiry_form_button}>
                            <button className={style.button + " "+ style.cancel} onClick={()=> {props.onClose()}}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CounterBooking;
                    