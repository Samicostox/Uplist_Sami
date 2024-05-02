import React, { useEffect } from "react";
import style from "./refresh.module.css";
import { useNavigate } from "react-router-dom";
import UserService from "../../../request-model/services/user.service";
import TokenService from "../../../request-model/services/token.service";
const Refresh = () => {

    let navigate = useNavigate();

    

    useEffect(() => {
        const redirect = async() => {
            // return to the previous onboarding page
            try {
                const resp = await UserService.onboardStripeAccount();
                console.log("resp: ",resp)
                if (resp.status === 200){
                    // get redirect url
                    let redirectUrl = resp.data.redirect;
                    // redirect to redirectUrl
                    window.location.replace(redirectUrl);
                }
            }
            catch (error) {
                console.log("error: ",error)
                const username = TokenService.getUser()?.username;
                if (username) {
                    navigate(`/biolink/${username}/edit`, { replace: true });
            
                }
                else {
                    navigate(`/`, { replace: true });
                }
            }
        }

        redirect();
    }, [navigate]);

    return (
        <div className={style.refresh}>
        
        
        </div>
    )
}

export default Refresh;