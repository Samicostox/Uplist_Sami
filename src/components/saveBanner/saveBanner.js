import { useEffect, useState } from "react";
import style from './saveBanner.module.css';


const SaveBanner = (props) => {

    const handleSave = () => {
        props.saveCallback();
    }

    useEffect(() => {
        if(props.state === ""){
            setBannerClass(style.save)
        }else
        if(props.state === "changed"){
            setBannerClass(style.save + " " + style.changed)
        }else if(props.state === "no_changes"){
            setBannerClass(style.save + " " + style.no_changes)
        }else if(props.state === "saving"){
            setBannerClass(style.save + " " + style.saving)
        }
    }, [props.state])


    const [bannerClass , setBannerClass] = useState(style.save)


    if (props.state === "load"){
        return(
        <>
     
        </>
        )
    }
    return(

        <div className={bannerClass}>
             
                
                <div className={style.save_text}> 
                    Save changes
                </div> 
                <button className={style.save_button} onClick={handleSave}>Save</button>
            
            </div>
    )
    
    
}

export default SaveBanner;