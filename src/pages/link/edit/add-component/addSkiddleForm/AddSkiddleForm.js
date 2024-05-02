import React from 'react';
import { useState, useEffect } from 'react';
import style from '../../form.module.css';
import UserService from '../../../../../request-model/services/user.service';





const initialValues = {
    url: ""
};


function AddSkiddleForm(props) {

    const [formInput, setFormInput] = useState(initialValues);
    const [module_form_class, setModuleFormClass] = useState(style.module_form);

    useEffect(() => {
        if (props.changed === "left"){
            setModuleFormClass(style.module_form + " " + style.left);
        }else if (props.changed === "right"){
            setModuleFormClass(style.module_form + " " + style.right);
        }
    }, [props.changed])

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

            // validate form input url 
            //check if url starts with http:// or https://
            // if not, add https:// to the start of the url
            if (!formInput.url.startsWith("http://") && !formInput.url.startsWith("https://")){
                formInput.url = "https://" + formInput.url;
            }

            const saveLinkResp = await UserService.addLink("skiddle", "skiddle", formInput.url, props.linkpageId , props.nextIndex);


            if (saveLinkResp.status === 200 || saveLinkResp.status === 201) {
                props.successCallback("Link added successfully")

                props.onClose() 
                props.onAddCallback()
            } 
        } catch (error) {
            console.log("error: ",error)
            if (error?.response?.status === 401){
                props.errorCallback("Can't access resource - Unauthorised");
            }else {
                props.errorCallback("Something went wrong, please refresh and try again");
            }
        }
    }

    return (
        <div className={style.addModule_container}>
           <div className={module_form_class}>
                <div className={style.module_header}>
                    <h3>Add a link to your skiddle events!</h3>
                </div>
            
                <form>

                    <div className={style.module_form_input}>
                        <label>URL</label>
                        <input type="text" name="url" value={formInput.url} onChange={handleLinkUrlChange} />
                    </div>
                    
                    <div className={style.module_form_buttons}>
                        <button className={style.module_form_button + " " + style.cancel} type="button" onClick={props.onClose}>Cancel</button>
                        <button className={style.module_form_button + " " + style.save} type="button" onClick={handleSave}>Save</button>
                    </div>
                </form>
            </div>
        </div>        
        )

}

export default AddSkiddleForm;
