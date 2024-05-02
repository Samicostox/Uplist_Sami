import React from 'react';
import style from './book.module.css';
import { NavLink } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const Book = (props) => {
    
   


    

    const renderProfileImage = () => {
        
        if (props.pageImage) {
            return (
                <div className= {style.bookings_image_container}>
                    <div className={style.profileImage} >
                        <img src={process.env.REACT_APP_BACKEND_URL + props.pageImage} className={style.profileImage} alt=""/>
                    </div>
                </div>
            )
        }
        else {
            return (
                <>
                </  >
            )
        }
    }


    



    const renderStage1 = () => {
        return (
            <div className={style.content}>
                <div className={style.content_description}>
                    {props.bookingInfo}
                </ div>
                <div className={style.calander_row_group}>
                    <form onSubmit={props.handleStage1Submit}>
                        <div className={style.calendar_container}>
                            <div className={style.picker_row}>
                                <label className={style.form_label}>Start time</label>
                                <DateTimePicker disablePast defaultValue={dayjs('')} value = {props.startDateTime} onChange={props.handleStartTimeChange} minutesStep={15} />
                            </div>
                            <div className={style.picker_row}>
                            <label className={style.form_label}>End time</label>
                                <DateTimePicker  minDateTime={props.startDateTime.add(0, "minutes")} defaultValue={dayjs('')} value={props.endDateTime} onChange={props.handleEndTimeChange} minutesStep={15}/>
                            </div>
                            <div className={style.submit_button_container}>
                                <button className={style.submit_button} >Confirm</button>
                            </div>
                        </div>
                    </form>

                    
                </div>
            </div>
        )
    }



   
    const renderStage2 = () => {
        return(
            <div className={style.content}>
                <div className={style.content_description}>
                    Enter your enquiry price below, aswell as any further notes to send to the performer. After submiting, the performer will be notified and will get back to you as soon as possible.
                </ div>
                <form onSubmit={props.handleStage2Submit}>
                    <div className = {style.form_row} >
                        <label className={style.form_label}>Price</label>
                        <input className={style.form_input} required={true} type="text" placeholder="Enter your price here" value={props.price} onChange={props.handlePriceChange}/>
                    </div>
                    <div className = {style.form_row} >
                        <label className={style.form_label}>Notes</label>
                        <textarea className={style.form_text_area} type="text" placeholder="Enquiry notes" value={props.notes} onChange={props.handleNotesChange}/>
                    </div>
                    <div className={style.submit_button_container}>
                        <button className={style.submit_button}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }

    const renderSuccess = () => {
        return(
            <div className={style.content}>
                <div className={style.success_message}>
                    Your booking has been sent to the performer, they will get back to you as soon as possible.
                </div>
                <span className={style.success_message}>You can view your current and previous enquiries <NavLink to="/bookings?page=outgoing" className={style.link} > here! </NavLink></span>
            </div>
        );
    }


    const stageRenderer = () => {
        switch (props.currentStage) {
            case 1:
                return renderStage1();
            case 2:
                return renderStage2();
            case 3:
                return renderSuccess();
            default:
                return renderStage1();
        }
    }


    

    return (
        
        
        <div className={style.book}>

            {!props.loading && (
                <>
                
                    {renderProfileImage()}
            
                <div className={style.bookings_content_container} >
                    <div className={style.bookings_header}>
                        Bookings
                    </div>
                    <div className={style.bookings_content}>
                        {stageRenderer()}
                    </div>

                </div>
                </>
            )}


        </div>
        
    )


}

export default Book;