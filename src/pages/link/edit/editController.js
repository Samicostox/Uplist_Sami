import Edit from "./edit";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../../request-model/services/user.service";
import TokenService from "../../../request-model/services/token.service";



const EditController = (props) => {
    let params = useParams();
    let navigate = useNavigate();

    const initialValues = {
        linkpageId : undefined,
        userId : undefined,
        username : params.username,
        heading: "",
        subheading: "",
        headerImage: "",
    };

    const [formInput, setFormInput] = useState(initialValues);
    
    const [links, setLinks]  = useState([])

    const [emailLists, setEmailLists] = useState([]);

    const [bookingModule, setBookingModule] = useState([]);

    const canAccess = useCallback(async () => {
        if (!(await UserService.canEditLinkpage(params.username))){
            props.errorCallback("Can't access resource - Unauthorised");
            navigate('/biolink/'+params.username+'/');

        }
    },[params.username, props, navigate]);

    const [saveState, setSaveState] = useState("load");

    const [theme , setTheme] = useState("");
    const setDark = () => {
        document.documentElement.setAttribute("data-theme", "dark");
    };
      
    const setLight = () => {
        document.documentElement.setAttribute("data-theme", "light");
    };

    const fetchMailchimpLists = useCallback(async () => {
        try {
            const respEmailLists = await UserService.getMailchimpLists();
            setEmailLists(respEmailLists.data.lists);
        }catch (error) {
            if (error?.response?.status === 401){
                props.errorCallback("Can't access resource - Unauthorised");
                navigate('/');
            }
            if (error?.response?.status === 404){
                setEmailLists([]);
            }
        }
    },[props, navigate]);


    const fetchBookingModule = useCallback(async (userId) => {
        try {
            const respBookingModule = await UserService.getStripeConnection(userId);
            if (respBookingModule.data.is_active){
                setBookingModule([respBookingModule.data]);
            } else {
                setBookingModule([]);
            }
        }catch (error) {
            if (error?.response?.status === 401){
                props.errorCallback("Can't access resource - Unauthorised");
                navigate('/');
            }
            if (error?.response?.status === 404){
                setBookingModule([]);
            }
        }
    },[props, navigate]);


    const [loading , setLoading] = useState(false);

    const fetchData = useCallback(async () => {

        setLoading(true);
        // send request to fetch links from backend given the username

        try {
                
           
        const respLinksEdit = await UserService.getLinkpage(params.username);


            if (respLinksEdit.status === 200) {

                canAccess(respLinksEdit.data.id);


                setFormInput(formInput => ({
                    ...formInput,
                    linkpageId: respLinksEdit.data.id,
                    userId: respLinksEdit.data.user.id,
                    heading: respLinksEdit.data.header,
                    subheading: respLinksEdit.data.description,
                    headerImage: respLinksEdit.data.profilePicture,
                }));

                await setLinks(respLinksEdit.data.links || []);

                // set the page theme
                const isDarkMode = respLinksEdit.data.is_dark_mode;

                if (isDarkMode){
                    setDark();
                    setTheme("dark");
                } else {
                    setLight();
                    setTheme("light");
                }   
                
                await fetchBookingModule(respLinksEdit.data.user.id); 
            } 
        }catch (error) {
            console.log("error: ",error)
            // redirect to landing page
            if (error?.response?.status === 401){
                props.errorCallback("Can't access resource - Unauthorised");
                navigate('/');
            }
            else {
                props.errorCallback("Something went wrong");
                navigate('/');
            }
        }
        
        await fetchMailchimpLists();
        setLoading(false);

    
        

    },[params.username, props, navigate, canAccess, fetchMailchimpLists, fetchBookingModule]);


 

    useEffect  ( () => {
        
        fetchData();
        
        if (! TokenService.getUser()){
            navigate('/biolink/'+params.username);
        }

      

    }, [fetchData, navigate, params.username]) 

    function scrollTop() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    const handleFormChange = (key, value) => {
        setFormInput({
            ...formInput,
            [key] : value,
        });
        setSaveState("changed")
    }


    const [editLink, setEditLink] = useState(-1);
    

    const onGetImageFileUploadCallback = (imageFile) => {
        console.log("image file: ", imageFile)

        setFormInput({
            ...formInput,
            headerImage: imageFile,
        })
        setSaveState("changed")
    }

     const onAddCallback = () => {
        scrollTop();
        fetchData();
    }

     

    const onDelete =  () => {
        fetchData();
        scrollTop();
    }
    const onUpdate = () => {
        fetchData();
        scrollTop();
    }

    
    
    

     const [singleProgress, setSingleProgress] = useState(0);

     const handleSave = async() => {

        let success = true;

        // validate form input
        if (!formInput.heading) {
            props.errorCallback("Header field cannot be empty");
            return;
        } else if (!formInput.subheading) {
            props.errorCallback("Bio field cannot be empty");
            return;
        }


        try {

            const config = {
                onUploadProgress: (progressEvent) => {
                    const {loaded, total} = progressEvent;
                    const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
                    setSingleProgress(percentage);
                }};
                console.log("image upload progress: ", singleProgress)

                const isDarkMode = theme === "dark";


            const updateLinkPageResp = await UserService.updateLinkPage(
                formInput.userId, 
                formInput.linkpageId,
                formInput.headerImage, 
                formInput.heading,
                formInput.subheading, 
                isDarkMode, 
                config
            );

            if (!(updateLinkPageResp.status === 200 || updateLinkPageResp.status === 204)) {
                success = false;
            }
            
        }catch (error) {
            console.log("error: ",error)
            success = false;
        }

        

        // save edited subheading

        if (!success) {
            props.errorCallback("Error saving profile, Please refresh and try again");
        }else {
            props.successCallback("Profile saved successfully");
        }

        // resete edited links and fetch most recent data
        scrollTop();
        setEditLink(-1);
        fetchData();
        setSaveState("no_changes")
    }

    


   
    const toggleTheme = (e) => {
        setSaveState("changed");

        if (e.target.checked) {
            setTheme("dark");
            setDark();
        } else {
            setTheme("light");
            setLight(); 
        }
    };

    


    return (
        <Edit 
            successCallback={props.successCallback}
            errorCallback={props.errorCallback}

            form = {formInput}
            handleFormChange = {handleFormChange}
            links = {links}
            
            editLink = {editLink}
            setEditLink = {setEditLink}

            onDelete = {onDelete}
            onUpdate = {onUpdate}
            handleSave = {handleSave}
            saveState = {saveState}
            onAddCallback = {onAddCallback}


            emailLists = {emailLists}
            bookingModule  = {bookingModule}

            onGetImageFileUploadCallback = {onGetImageFileUploadCallback}

            theme = {theme}
            toggleTheme = {toggleTheme}

            loading = {loading}

            
        />
    )
}


export default EditController;

