import React, { useEffect, useState } from "react";
import style from "./paymentSuccess.module.css";
import Lottie from "lottie-react";
import success from "./success.json";
import {NavLink} from "react-router-dom";

import { ReactComponent as LogoSvg } from './success.svg'



const PaymentSuccess = () => {

    useEffect(() => {

        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });
    
    }, [])

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: {success},
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

      const logoStyle = {
        height: 300,
      };


    const [successTransition, setSuccessTransition] = useState(true);
    

    const renderSuccessLogo = () => {
        return (

            <div className={style.paymentSuccess_icon_container}>
                <Lottie
                    animationData = {success}
                    options={defaultOptions}
                    speed={1}
                    style={logoStyle}
                    loop={false}
                    onComplete={() => setSuccessTransition(false)}

                />
            </div>
        );
    }

    const successPage = () => {
        return (
            <div className={style.paymentSuccess_container}>
                <div className={style.success_logo_container}>
                    <LogoSvg className={style.success_logo} />
                </div>

                <div className={style.paymentSuccess_title}>
                    Payment Successful!
                </div>
                <div className={style.paymentSuccess_text}>
                    you can view you upcoming bookings <NavLink to="/bookings?page=upcoming" className={style.link}>here</NavLink> 
                </div>
            </div>
        );
    }


    return (
        <div className={style.paymentSuccess}>
            {successTransition? 
            (
                <> 
                    {renderSuccessLogo()}
                </ >
            ) : (
                <>
                    {successPage()}
                
                </>
            )}
        
        </div>
    )
}

export default PaymentSuccess;