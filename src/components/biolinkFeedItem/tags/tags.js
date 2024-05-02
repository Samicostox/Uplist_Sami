import React from 'react';
import style from './tags.module.css';

const Tags = (props) => {
    
    
    const renderTag = (tag) => {
        let tagStyle = {
        outline:   '2.5px solid rgb(25, 112, 8)',
        color: 'rgb(15, 68, 4)',
        }

        if (tag === "music artist"){ 
        tagStyle = {
            outline:   '2.5px solid rgb(18, 65, 119)',
            color: 'rgb(4, 30, 68)',
        }
        }else if (tag === "dj"){
        tagStyle = {
            outline:   '2.5px solid rgb(97, 19, 93)',
            color: 'rgb(54, 7, 63)',
        }
        }

        return (
        <div className = {style.tag} style={tagStyle}>
            {tag} 
        </div>
        )
    }
    const renderTags = () => {
        return(
            <div className = {style.tags}>
                    
                {props.tags.map((tag, index) => {
                return (
                    <>
                        {renderTag(tag)}
                    </>
                )
                })}
            </div>
        )
    }

    return (
        <>
            {renderTags()}
        </>
    )
}   

export default Tags;


