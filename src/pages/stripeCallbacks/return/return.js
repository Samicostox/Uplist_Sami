import React, { useEffect } from "react";
import style from "./return.module.css";
import { useNavigate } from "react-router-dom";
import TokenService from "../../../request-model/services/token.service";

const Return = () => {

    let navigate = useNavigate();

    useEffect(() => {
        // redirect to their biolink edit page
        // get the username
        const username = TokenService.getUser().username 
        if (username) {
            navigate(`/biolink/${username}/edit`, { replace: true });
    
        }
        else {
            navigate(`/`, { replace: true });
        }
    }, [navigate]);

    return (
        <div className={style.return}>
        
        
        </div>
    )
}

export default Return;