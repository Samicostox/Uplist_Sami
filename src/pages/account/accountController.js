import React, { useState, useEffect, useCallback } from 'react';
import Account from './account';
import TokenService from '../../request-model/services/token.service';
import UserService from '../../request-model/services/user.service';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../request-model/services/auth.service';

const initialValues = {
    username: '',
    userId: '',
    email: '',
    biolinkVisible: undefined,
    accountType: '',
    status: '',
}

const AccountController = (props) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saveState, setSaveState] = useState("load");
    const [formInput, setFormInput] = useState(initialValues);

    const updateFormInput = (key, value) => {
        setFormInput({
            ...formInput,
            [key]: value,
        })
        setSaveState("changed")
    }

    const deleteAccount = async(userId) => {
        // send request to delete account
        try {
            const resp = await AuthService.deleteAccount(userId);
            if (resp.status === 200){
                props.successCallback("Account deleted successfully"); 
                await TokenService.removeUser();
                navigate('/auth/sign-up');
            }
        }
        catch (error) {
            props.errorCallback("Something went wrong, please try again later");
        }
    }

    const saveAccountInfo = async() => {
         // print current user from token storage
        let previousUser = TokenService.getUser();

        // save
        try {
            let newUsername = formInput.username;
            const resp = await AuthService.editUser(newUsername,formInput.userId, formInput.email, formInput.accountType, formInput.tag, formInput.biolinkVisible);
            if (resp.status === 200) {
                props.successCallback("Changes saved successfully");

                // update token storage
                TokenService.setUser({
                    ...previousUser,
                    username: newUsername,
                })
            }

        }
        catch (error) {
            props.errorCallback("Something went wrong, please and try again");
        }
        fetchData();
        // change logged in username 
        setSaveState("no_changes")
    }


    const fetchData = useCallback(async () => {

        // send request to fetch the user information from the backend

        try{
            const username = TokenService.getUser()?.username;

            if (!username) {
                navigate('/auth/login');
            }



            const resp = await UserService.getLinkpage(username);
            if (resp.status === 200) {

                const user = resp.data.user;

                setFormInput(formInput =>({
                    ...formInput,
                    username: username,
                    userId: user.id,
                    email: user.email,
                    accountType: user.is_artist ? 'business' : 'personal',
                    tag: user.artist_type,
                    status: user.is_approved ? 'approved' : 'pending',
                    biolinkVisible: user.is_linkpage_visible,
                    isReviewed: user?.is_reviewed,
                }))
            }

        } catch (error) {
            console.log(error);
            props.errorCallback("Something went wrong, please and try again");
            navigate('/');
        }
        setLoading(false);

     
    },[navigate, props]);

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [fetchData]);


    return (
        <>
            <Account  
            form={formInput}    
            onDeleteAccount = {deleteAccount} 
            onSaveAccount = {saveAccountInfo} 
            saveState = {saveState}
            updateFormInput = {updateFormInput}
            // setSaveState = {setSaveState}
            isLoading = {loading}
            errorCallback ={props.errorCallback}
            successCallback = {props.successCallback}
            />
        </>
    );
}

export default AccountController;