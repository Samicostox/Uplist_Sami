import React, { useCallback, useRef } from 'react';

import style from './editModule.module.css';

import UpdateLinkForm from './updateLinkForm/UpdateLinkForm';
import UpdateSpotifyForm from './updateSpotifyForm/UpdateSpotifyForm';
import UpdateSoundcloudForm from './updateSoundcloudForm/UpdateSoundcloudForm';
import UpdateYoutubeForm from './updateYoutubeForm/UpdateYoutubeForm';
import UpdateEmailForm from './updateEmailForm/UpdateEmailForm';
import UpdateBookingForm from './updateBookingForm/UpdateBookingForm';

import { useOutSideClickAlert } from '../../../../components/hooks/outsideClickHook';
import UpdateSkiddleForm from './updateSkiddleForm/UpdateSkiddleForm';

function EditModule(props) {
    const wrapperRef = useRef(null);
    useOutSideClickAlert(wrapperRef,props.onClose);

    const onSuccess = () => {
        props.successCallback("Link updated successfully");
    }
    const onDelete = useCallback( () => {
        props.successCallback("Link deleted successfully");
        props.onDeleteCallback();
    }, [props]);



    return (
    <div className = {style.edit_container}  data-testid = "edit-module">
        <div  ref={wrapperRef} className = {style.edit}  >
            <div className = {style.edit_form}>
                {props.link.type === "link"  && (
                    <UpdateLinkForm  
                        successCallback = {onSuccess}
                        errorCallback = {props.errorCallback}
                        onClose = {props.onClose}
                        onUpdateCallback = {props.onUpdateCallback}
                        onDeleteCallback = {onDelete}

                        linkpageId = {props.linkpageId} 
                
                        link = {props.link}

                    />
                )}
                {props.link.type === "spotify"  && (
                    <UpdateSpotifyForm  
                        successCallback = {onSuccess}
                        errorCallback = {props.errorCallback}
                        onClose = {props.onClose}
                        onUpdateCallback = {props.onUpdateCallback}
                        onDeleteCallback = {onDelete}

                        linkpageId = {props.linkpageId} 
                
                        link = {props.link}

                    />
                )}
                {props.link.type === "soundcloud"  && (
                    <UpdateSoundcloudForm  
                        successCallback = {onSuccess}
                        errorCallback = {props.errorCallback}
                        onClose = {props.onClose}
                        onUpdateCallback = {props.onUpdateCallback}
                        onDeleteCallback = {onDelete}

                        linkpageId = {props.linkpageId} 
                
                        link = {props.link}

                    />
                )}
                {props.link.type === "youtube"  && (
                    <UpdateYoutubeForm  
                        successCallback = {onSuccess}
                        errorCallback = {props.errorCallback}
                        onClose = {props.onClose}
                        onUpdateCallback = {props.onUpdateCallback}
                        onDeleteCallback = {onDelete}

                        linkpageId = {props.linkpageId} 
                
                        link = {props.link}

                    />
                )}
                {props.link.type === "skiddle"  && (
                    <UpdateSkiddleForm  
                        successCallback = {onSuccess}
                        errorCallback = {props.errorCallback}
                        onClose = {props.onClose}
                        onUpdateCallback = {props.onUpdateCallback}
                        onDeleteCallback = {onDelete}

                        linkpageId = {props.linkpageId} 
                
                        link = {props.link}

                    />
                )}
                {props.link === "email"  && (
                    <UpdateEmailForm  
                        successCallback = {onSuccess}
                        errorCallback = {props.errorCallback}
                        onClose = {props.onClose}
                        onUpdateCallback = {props.onUpdateCallback}
                        onDeleteCallback = {onDelete}

                        linkpageId = {props.linkpageId} 


                    />
                )}
                {props.link === "booking"  && (
                <UpdateBookingForm  
                    successCallback = {props.successCallback}
                    errorCallback = {props.errorCallback}
                    onClose = {props.onClose}
                    onUpdateCallback = {props.onUpdateCallback}
                    onDeleteCallback = {onDelete}

                    userId = {props.userId} 
               


                />
            )}


            </div>
                  

                       
        </div>
    </ div>
    )
}
export default EditModule;