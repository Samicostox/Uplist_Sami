import React from 'react';
import { useState, useEffect } from 'react';
import style from '../../form.module.css';
import UserService from '../../../../../request-model/services/user.service';
import { FaInfoCircle } from 'react-icons/fa';








function UpdateSoundcloudForm(props) {

    const initialValues = {
        url: props.link.url
    };

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

            const saveLinkResp = await UserService.updateLink(props.link.id, formInput.linkText, formInput.url , props.link.index,  props.linkpageId, "soundcloud");


            if (saveLinkResp.status === 200 || saveLinkResp.status === 201) {
                props.successCallback()

                props.onClose() 
                props.onUpdateCallback()
            } 
        } catch (error) {
            console.log("error: ",error)
            if (error?.response?.status === 401){
                props.errorCallback("Can't access resource - Unauthorised");
            }
            else {
                props.errorCallback("Something went wrong, please refresh and try again");
            }
        }
    }

    const handleDelete = async (e) => {

        try {
            const deleteLinkResp = await UserService.deleteLink(props.link.id);


            if (deleteLinkResp.status === 200 || deleteLinkResp.status === 204) {
                props.onDeleteCallback();
            } 
         
        }catch (error) {
            console.log("error: ",error)
            props.errorCallback("An eror occured when deleting the link");
        }

    }



    return (
        <div className={style.addModule_container}>
            <div className={module_form_class}>
                <div className={style.module_header}>
                    <h3>Edit Soundcloud Link</h3>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                        }}
                    >
                        <FaInfoCircle style={{ marginRight: 10 }} />
                        <p>
                            Make sure that your account&nbsp;
                            <a
                                href='https://help.soundcloud.com/hc/en-us/articles/115003568008-Embedding-a-track-or-playlist-#:~:text=To%20get%20an%20embed%20code,have%20to%20embed%20your%20player.'
                                target='_blank' rel="noreferrer"
                            >
                                allows embeds
                            </a>
                        </p>
                    </div>
                </div>
            
                <form>
                    <div className={style.module_form_input}>
                        <label>URL</label>
                        <input type="text" name="url" value={formInput.url} onChange={handleLinkUrlChange} />
                    </div>
                    
                    <div className={style.module_form_buttons}>
                    <button className={style.module_form_button + " " + style.cancel} type="button" onClick={props.onClose}>Cancel</button>
                        <button className={style.module_form_button + " " + style.delete} type="button" onClick={handleDelete}>Delete</button>
                        <button className={style.module_form_button + " " + style.save} type="button" onClick={handleSave}>Save</button>
                    </div>
                </form>
            </div>
        </div>        
        )

}

export default UpdateSoundcloudForm;
