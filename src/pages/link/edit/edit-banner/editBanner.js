import style from './editBanner.module.css';
import { NavLink } from "react-router-dom";


const EditBanner = (props) => {

    if (!props.canEdit){
        return (
            <>
            </>
        )
    }
    

    return(
  
        <div className={style.edit}>
             
                
                <div className={style.banner_text}> 
                    Edit Page
                </div> 
                <NavLink to={'edit'} >
                    <button className={style.edit_button} >EDIT</button>
                </NavLink>
            </div>
    )
    
    
}

export default EditBanner;