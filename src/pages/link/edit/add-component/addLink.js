import React from 'react';
import { useState } from 'react';
import formStyle from '../edit.module.css'
import addStyle from './addLink.module.css'
import UserService from '../../../../request-model/services/user.service';

const initialValues = {
    linkText: "",
    description: "",
    url: ""
};

function AddLink(props) {

    const [formInput, setFormInput] = useState(initialValues);

    const handleLinkTextChange =  (e) => {
        
        const { name, value } = e.target;
        setFormInput({
            ...formInput,
            ...formInput.linkText,
            [name] : value,
        });

    }


    const handleLinkUrlChange =  (e) => {
        const { name, value } = e.target;
        setFormInput({
            ...formInput,
            ...formInput.firstName,
            [name] : value,
        });

    }

    const handleSave = async (e) => {

        try {


            
            const saveLinkResp = await UserService.addLink(formInput.linkText, "https://www."+ formInput.url, props.linkPageId , props.nextIndex);


            if (saveLinkResp.status === 200 || saveLinkResp.status === 201) {
                props.successCallback("Link added successfully")

                props.onClose() 
                props.onAddCallback()
            } 
        }catch (error) {
            console.log("error: ",error)
            if (error?.response?.status === 401){
                props.errorCallback("Can't access resource - Unauthorised");
            }else {
                props.errorCallback("Something went wrong, please refresh and try again");
            }
        }

    }

    const handleClose = async(e) => {
       props.onClose()
    }



    return (
        <div  className = {formStyle.link_item_open}>
                    <div className={formStyle.dropdown_icon_container} onClick = {handleClose} >
                            <img src = {"/pictures/edit/down-arrow.svg"} className={formStyle.dropdown_icon} alt = "close button"/>
                        </div>
                    
                    <div className= {false ? formStyle.edit_container_close: formStyle.edit_container}   >
                        <div className={formStyle.form_container}>
                        
                            <div className={formStyle.edit_label}>
                                Link Text
                            </div>
                            <div className={formStyle.edit_link_container}>
                               
                                    <input 
                                        type="text" 
                                        id = "linkText"
                                        name = "linkText"
                                        placeholder='Link Text'
                                        className={formStyle.link_text_input}
                                        value={formInput.linkText}
                                        onChange={handleLinkTextChange}
                                        autoFocus />
                               
                            </div>


                            <div className={formStyle.edit_label}  >
                                Link Url
                            </div>
                            <div className={formStyle.edit_link_container}>
                            <div className={formStyle.link_url_input}>
                                https://www.
                                <input 
                                    type="text" 
                                    id = "url"
                                    name = "url"
                                    className={formStyle.link_text_input} 
                                    value={formInput.url} 
                                    onChange={handleLinkUrlChange}
                                 />

                            </div>
                        </div>
                        </div>
                         <div className={addStyle.buttons_container}>
                <div className={formStyle.save_button} onClick = {handleSave}>
                    Add
                </div>
                <div className={formStyle.cancel_button} onClick = {handleClose}>
                    Cancel
                </div>
            </div>
                        
                    </div>

                       
                    
                    </div>
    )
}
export default AddLink;