import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import style from '../../form.module.css';
import UserService from '../../../../../request-model/services/user.service';
import TokenService from '../../../../../request-model/services/token.service';
import HashLoader from "react-spinners/HashLoader";
import FadeLoader from "react-spinners/FadeLoader";
import UpdateEmailForm from '../../update-component/updateEmailForm/UpdateEmailForm';
import api from '../../../../../request-model/services/api';





function AddEmailForm(props) {


    const [module_form_class, setModuleFormClass] = useState(style.module_form);
    // loading state can be: start, loading, success, error
    const [loadingState, setLoadingState] = useState("start");
    const [formLoadingState, setFormLoadingState] = useState("loading");


    useEffect(() => {
        if (props.changed === "left"){
            setModuleFormClass(style.module_form + " " + style.left);
        }else if (props.changed === "right"){
            setModuleFormClass(style.module_form + " " + style.right);
        }
    }, [props.changed])

    const [emailLists, setEmailLists] = useState([]);

    const fetchData =  useCallback(async() => {
        let EmailLists = [];

        try {
            let resp = await UserService.getMailchimpLists();
            console.log(resp)
            EmailLists = resp.data.lists;
            setEmailLists(EmailLists);

        }
        catch (error) {
            if (error?.response?.status === 404){
                setEmailLists([]);
            }else {
                console.log("error: ", error)
                props.errorCallback("Something went wrong, please refresh and try again");
                setLoadingState("error");
            }
        }
        setFormLoadingState("loaded")
    }
    ,[props])

    useEffect(() => {

        fetchData();

    }, [fetchData])


    const handleConnectSave = async (e) => {
        if (loadingState !== "start") return;


        setLoadingState("loading");

        try {

            const rs = await api.post("/users/login/refresh/", {
                refresh: TokenService.getLocalRefreshToken(),
            });
            if (rs.status === 200){
                TokenService.updateLocalAccessToken(rs.data.access);
            }

            const connectToMailchimpRes = await UserService.connectMailchimp();
            


            if (connectToMailchimpRes.status === 200 ) {
                let redirectUrl = connectToMailchimpRes.data.redirect;
                // redirect to redirectUrl
                window.location.replace(redirectUrl);
            } 
        } catch (error) {
            console.log("error: ",error)
            if (error?.response?.status === 401){
                props.errorCallback("Can't access resource - Unauthorised");
                setLoadingState("error");
            }else {
                props.errorCallback("Something went wrong, please refresh and try again");
                setLoadingState("error");
            }
        }
    }

    const ConnectToMailchimpForm = () => {


        return (
            <div className={style.addModule_container}>
                <div className={module_form_class}>
                    <div className={style.module_header}>
                        <h3>Connect with mailchimp to add a mailing list!</h3>
                    </div>
                
                    <div className={style.module_body}>
                        {/* mailchimp icon button */}
                        <div className={style.mailchimp_icon_container} onClick={handleConnectSave}>
                            {(loadingState === "loading")? (
                                <HashLoader className={style.loader}  color='#3b3b3b' loading={true} size={20} />
                            ) : (
                                <img src="/pictures/edit/mailchimp.webp" alt="mailchimp icon"/>
                            )}
                        </div>
                    </div>
                </div>
            </div>        
        )
    }

    const onSuccess = () => {
        props.successCallback("Link updated successfully");
    }

    const onDelete = () => {
        setFormLoadingState("loading");
        setEmailLists([]);
        fetchData();
    }
    const updateEmailListForm = () => {
        return (
            <>
            <UpdateEmailForm  
            successCallback = {onSuccess}
            errorCallback = {props.errorCallback}
            onClose = {props.onClose}
            onUpdateCallback = {props.onUpdateCallback}
            onDeleteCallback = {onDelete}

            linkpageId = {props.linkpageId} 


                    />
            </>
        )
    }

    return(
        <>
            {(formLoadingState === "loading") ? (
                <div className={style.form_loading}>
                    <FadeLoader className={style.loader}  />
                </div>
            ):(
                <>

                    {(emailLists.length === 0) && (
                        <>
                            {ConnectToMailchimpForm()}
                        </>
                    )}
                    {emailLists.length > 0 && (
                        <>
                            {updateEmailListForm()}
                        </>    
                    )}
                </>
            )}
        </>
    )

}

export default AddEmailForm;
