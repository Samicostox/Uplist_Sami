import React from 'react';
import style from '../link.module.css';
import { useState } from 'react';
import formStyle from './edit.module.css'
import AddModule from './add-component/addModule';
import GetImageFile from '../../../components/getImageFile/getImageFile';
import SaveBanner from '../../../components/saveBanner/saveBanner';
import EditModule from './update-component/editModule';
import { FaLink, FaPlusCircle } from 'react-icons/fa';



function Edit(props) {


    const renderProfileImage = () => {
        if (props.form.headerImage) {
            if (props.form.headerImage.preview){
                return (
                    <img src={props.form.headerImage.preview} alt="profile" className={style.heading_image}/>
                )
            }else {
                return (
                    <img src={props.form.headerImage} alt="profile" className={style.heading_image}/>
                )
            }
        } 
        else {
            return (
                <img src="/pictures/temp/profile.png" alt="profile" className={style.heading_image}/>
            )
        }
    }

    
    const getNextIndex = () => {
        let maxIndex = -1;
        props.links.forEach((link) => {
            if (link.index > maxIndex) {
                maxIndex = link.index;
            }
        })
        return maxIndex + 1;
    }

    
   

   

    
    const renderLinks = (type, title) => {
        // count number of links of type
        let count = 0;
        props.links.forEach((link) => {
            if (link.type === type) {
                count++;
            }
        })

        
        return (
          <div className={formStyle.links}>
            {(count > 0) && (<>{dividerBlock(title)}</>)}
            {props.links.map((link, index) => (
                link.type === type && (

                <>
                { (props.editLink === props.links[index].id) && (
    
                        <EditModule 
                            link = {props.links[index]}
                            onClose = {() => props.setEditLink(-1)} 
                            linkpageId = {props.form.linkpageId} 
                            nextIndex = {getNextIndex()}
                            errorCallback = {props.errorCallback}
                            successCallback = {props.successCallback}
                            onDeleteCallback = {props.onDelete} 
                            onUpdateCallback = {props.onUpdate}
                            userId = {props.form.userId}
                            
                            />

                ) }
              
                <div className={style.link_item + " " + style.edit} onClick={() => props.setEditLink(link.id)} key={link.id} data-testid = "edit-link">
                    <FaLink className={style.link_icon} />{" "}
                    {link.content}
                    {/* {" "} link indec: {link.index} link id: {link.id} */}
                    <div className={formStyle.edit_icon_container}>
                        <img src={"/pictures/edit/pencil.svg"} className={formStyle.edit_icon} alt="edit link button" />
                    </div>
                </div>

                </>
            )
        ))}
        </div>
        )
    }

    const [editEmailLists, setEditEmailLists] = useState(false);
    const [editBookingModule, setEditBookingModule] = useState(false);
    const [edit_subheading, setEditSubheading] = useState(false);
    const [edit_heading, setEditHeading] = useState(false);
    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
          e.target.blur(); 
          //Write you validation logic here
        }
     }


    const renderEmailLists = (title) => {
        // count number of links of type
        

        
        return (
            <div className={formStyle.links}>
            {(props.emailLists.length > 0) && (
            <>
                {dividerBlock(title)}

                {editEmailLists&& (
    
                    <EditModule 
                        link = {"email"}
                        onClose = {() => setEditEmailLists(false)} 
                        linkpageId = {props.form.linkpageId} 
                        nextIndex = {getNextIndex()}
                        errorCallback = {props.errorCallback}
                        successCallback = {props.successCallback}
                        onDeleteCallback = {props.onDelete} 
                        onUpdateCallback = {props.onUpdate}
                        data-testid = "edit-module"
                        userId = {props.form.userId}
                        />
                )}


              
                <div className={style.link_item + " " + style.edit} onClick={() => setEditEmailLists(true)} >
                    {"Email Subscription Lists"}
                    {/* {" "} link indec: {link.index} link id: {link.id} */}
                    <div className={formStyle.edit_icon_container}>
                        <img src={"/pictures/edit/pencil.svg"} className={formStyle.edit_icon} alt="etit link button" />
                    </div>
                </div>

            </>
          
            )}
            </div>
        )
    }

    const renderBookingModule = (title) => {

        return (
            <div className={formStyle.links}>
            {(props.bookingModule.length > 0) && (
            <>
                {dividerBlock(title)}

                {editBookingModule && (
    
                    <EditModule 
                        link = {"booking"}
                        onClose = {() => setEditBookingModule(false)} 
                        linkpageId = {props.form.linkpageId} 
                        nextIndex = {getNextIndex()}
                        errorCallback = {props.errorCallback}
                        successCallback = {props.successCallback}
                        onDeleteCallback = {props.onDelete} 
                        onUpdateCallback = {props.onUpdate}
                        data-testid = "edit-module"
                        userId = {props.form.userId}
                        />
                )}


              
                <div className={style.link_item + " " + style.edit} onClick={() => setEditBookingModule(true)} >
                    {"Manage Booking feature"}
                    {/* {" "} link indec: {link.index} link id: {link.id} */}
                    <div className={formStyle.edit_icon_container}>
                        <img src={"/pictures/edit/pencil.svg"} className={formStyle.edit_icon} alt="etit link button" />
                    </div>
                </div>

            </>
          
            )}
            </div>
        )
    }
    

   


    const editProfileDataBox = (heading, subheading, socialMediaIconLinks) => {
        return(
          <div className= {style.profileDataBox}>
            <div className={formStyle.profileDataBoxForm }>
                <form onSubmit = {props.handleSave}>

                    <div className={style.profileDataBoxHeading + " " + style.edit}>
                        <label htmlFor="heading" className={formStyle.headingLabel}>Header: </label>
                        {edit_heading ? (
                        <>
                            <input 
                                className = {formStyle.form }
                                type="text"
                                id = "heading"
                                name = "heading"
                                value = {props.form.heading}
                                onChange = {(event) => props.handleFormChange("heading", event.target.value)}
                                placeholder = "Heading"
                                onBlur={() => setEditHeading(false)}
                                autoFocus
                                onKeyDown={(e) => handleKeyPress(e)}
                                >
                                

                            </input>
                        </>
                        ) : (
                            <div className= {formStyle.edit_text_text}  onClick={() => setEditHeading(true)}>
                                <div className={formStyle.heading} >
                                    {props.form.heading}
                                </div>
                                {/* <div className={formStyle.edit_icon_container} onClick = {() => setEditHeading(true)}>
                                <img src = {"/pictures/edit/pencil.svg"} className={formStyle.edit_icon_header} alt = "edit link button"/>
                                </div> */}
                            </div>
                        )}
                    </div>

                    <div className={style.profileDataBoxSubheading + " " + style.edit}>
                        <label htmlFor="subheading" className={formStyle.subheadingLabel}>Bio: </label>
                        {edit_subheading ? (
                        <>
                            <input 
                                className = {formStyle.form }
                                type="text"
                                id = "subheading"
                                name = "subheading"
                                value = {props.form.subheading}
                                onChange = {(event) => props.handleFormChange("subheading", event.target.value)}
                                placeholder = "subheading"
                                onBlur={() => setEditSubheading(false)}
                                autoFocus
                                onKeyDown={(e) => handleKeyPress(e)}
                                >
                                

                            </input>
                        </>
                        ) : (
                            <div className= {formStyle.edit_text_text}onClick={() => setEditSubheading(true)}>
                                <div className={formStyle.subheading} >
                                    {props.form.subheading}
                                </div>
                                {/* <div className={formStyle.edit_icon_container} onClick = {() => setEditSubheading(true)}>
                                <img src = {"/pictures/edit/pencil.svg"} className={formStyle.edit_icon_header} alt = "edit link button"/>
                                </div> */}
                            </div>
                        )}
                    </div>
                </form>
            </div>


          </div>
          
        )

    }

    const editProfileImageBlock = () => {
        return (
            <div >
                {showGetImageFile && <GetImageFile 
                    linkpageId = {props.form.linkpageId}
                    onClose = {onGetImageFileClose}
                    successCallback = {props.successCallback}
                    errorCallback = {props.errorCallback}
                    onUploadCallback = {props.onGetImageFileUploadCallback}
                />}



                
                <div className={formStyle.heading_image_container}>
                    {renderProfileImage()}
                    <div className={formStyle.edit_icon_overlay} onClick = {() => {setShowGetImageFile(true)}} data-testid = "edit-image-button" >
                        <img src="/pictures/edit/pencil.svg" alt="edit" className={formStyle.edit_icon_overlay_image}/>
                    </div>
                </div>
            </div>
        )
    }

    const dividerBlock = (text) => {
        return (
            <div className={formStyle.divider}>
                <div className={formStyle.divider_line}></div>
                <div className={formStyle.divider_text}>{text}</div>
                <div className={formStyle.divider_line}></div>
            </div>
        )
    }


    const editThemeBlock = () => {
        return (
            <div className={formStyle.toggle_theme_wrapper}>
                <span>☀️</span>
                <label className={formStyle.toggle_theme} htmlFor="checkbox">
                <input
                    type="checkbox"
                    id="checkbox"
                    onChange={props.toggleTheme}
                    checked={props.theme === "dark"}
                />
                <div className={formStyle.slider + " " + formStyle.round}></div>
                </label>
                <span>🌒</span>
            </div>
        )
    }

    const [renderAddComponent, setRenderAddComponent] = useState(false);

    
    const handleAddContentClicked = () => {
        // if the page is not saved, then ask the user to save
        if (props.saveState === "changed") {
            props.errorCallback("Please save your changes before adding new content");
        } else {
            setRenderAddComponent(true);
        }
    }


    const [showGetImageFile, setShowGetImageFile] = useState(false);
    const onGetImageFileClose = () => setShowGetImageFile(false);


    return (
        <div className={style.profile} >

            {!props.loading && (
                <div className={style.profile_content}>
                    <SaveBanner saveCallback = {props.handleSave} state = {props.saveState}/>
                    <div className={formStyle.edit}>
                        {editThemeBlock()}
                        <div className={style.profile_container_uneven}>
                            {editProfileDataBox()}
                            {editProfileImageBlock()}
                        </div>

                        {renderAddComponent ? (
                        <AddModule 
                        onClose = {() => setRenderAddComponent(false)} 
                        linkpageId = {props.form.linkpageId} 
                        userId = {props.form.userId}
                        nextIndex = {getNextIndex()}
                        errorCallback = {props.errorCallback}
                        successCallback = {props.successCallback}
                        onAddCallback = {props.onAddCallback}
                        
                        
                        />) : (
                        <div className={formStyle.add_button} onClick = {handleAddContentClicked}>
                            <FaPlusCircle className={formStyle.add_icon} />
                            Add Content
                        </div>
                        )}


                        <div className={style.links_container}>
                        {renderBookingModule("Booking Feature")}
                        </div>
                        <div className={style.links_container}>
                        {renderEmailLists("Mailing List")}
                        </div>
                        <div className={style.links_container}>
                        {renderLinks("link", "Custom Links")}
                        </div>
                        <div className={style.links_container}>
                        {renderLinks("spotify", "Spotify Links")}
                        </div>
                        <div className={style.links_container}>
                        {renderLinks("soundcloud", "Soundcloud Links")}
                        </div>
                        <div className={style.links_container}>
                        {renderLinks("youtube", "Youtube Links")}
                        </div>
                        <div className={style.links_container}>
                        {renderLinks("skiddle", "Skiddle Links")}
                        </div>
                

                        


                    

                        
                    </div>
                </div>
            )}
        </div>
      
    );
}

export default Edit;