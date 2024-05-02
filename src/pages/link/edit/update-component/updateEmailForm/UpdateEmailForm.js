import React from 'react';
import { useState, useEffect } from 'react';
import style from '../../form.module.css';
import UserService from '../../../../../request-model/services/user.service';








function UpdateLinkForm(props) {




    const [module_form_class, setModuleFormClass] = useState(style.module_form);

    useEffect(() => {
        if (props.changed === "left"){
            setModuleFormClass(style.module_form + " " + style.left);
        }else if (props.changed === "right"){
            setModuleFormClass(style.module_form + " " + style.right);
        }
        
    }, [props.changed])

    const [emailLists, setEmailLists] = useState([]);
    useEffect(() => {
        const fetchEmailLists = async () => {
            try{
                const response = await UserService.getMailchimpLists();
                setEmailLists(response.data.lists);
            }catch(error){
                console.log(error);
            }
        }
        fetchEmailLists();
    }   , [])


    const handleSave = async (e) => {
        // set chosen email list as active
        // set other email lists as inactive
        // close modal
        e.preventDefault();
        const activeListId = document.getElementById("mailingList").value;
        try {
            for (let i = 0; i < emailLists.length; i++){
                if (emailLists[i].id === activeListId){
                    await UserService.updateMailchimpList(emailLists[i].id, true)
                }else{
                    await UserService.updateMailchimpList(emailLists[i].id, false)
                }
                props.successCallback();
                props.onClose();
            }
        }catch(error){
            props.errorCallback("Something went wrong: please refresh the page and try again");
        }
        
    }

    const handleDelete = async (e) => {
        try {
            const resp = await UserService.deleteMailchimp();
            if (resp.status === 204){
                props.onDeleteCallback();
            }
        }
        catch (error) {
            console.log(error);
            props.errorCallback("something went wrong: please refresh the page and try again");
        }
    }





    return (
        <div className={style.module_container} data-testid="update-email-list-form">
            <div className={module_form_class}>
                <div className={style.module_header}>
                    <h3>Update mailchimp mailing Lists</h3>
                </div>
            
                <form>
                    {/* select form to choose active mailing list */}
                    <div className={style.form_group}>
                        <label className={style.select_label} htmlFor="mailingList">Choose active mailing list</label>
                        <select className={style.select} id="mailingList" name="mailingList">
                            {emailLists.map((list) => (
                                <option className={style.option} key={list.id} value={list.id}>{list.name}</option>
                            ))}
                        </select>
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

export default UpdateLinkForm;
