import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { RiDragDropLine } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';

import style from './getImageFile.module.css';
import { useOutSideClickAlert } from '../hooks/outsideClickHook';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function GetImageFile(props) {

    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        onDrop: (acceptedFiles) => {
            console.log("accepted files: ", acceptedFiles);

            setFiles(acceptedFiles.map((file) => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        },
        validator: (file) => {
            if (file.size > 5242880) {
                props.errorCallback("Images must be less than 5mb");
            }

            return null;
        },
        maxSize: 5242880,
    });

    const cropperRef = useRef(null);

    const [image, setImage] = useState(files[0]?.preview);

    useEffect(() => {
        setImage(files[0]?.preview);
    }, [files]);

    const images = files.map((file, index) => (
        <div key={file.name}>
            <div className={style.remove_image_container}>
                <AiOutlineClose
                    size={30}
                    className={style.remove_image_button}
                    onClick={(e) => {
                        setFiles([]);
                        e.stopPropagation();
                    }}
                />
            </div>
            <div onClick={(e) => e.stopPropagation()}>
                <Cropper
                    style={{ height: 400, width: "100%" }}
                    ref={cropperRef}
                    zoomTo={0.25}
                    aspectRatio={1 / 1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    guides={true}
                    dragMode='move'
                />
                {/* <img src = {file.preview} style = {{width: "200px", cursor: "default"}} alt = "preview" /> */}
            </div>

        </div>
    ));

    const handleUpload = async () => {
        const cropData = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();

        let image = files[0];

        if (cropData) {
            const blob = await fetch(cropData).then(r => r.blob());
            image = new File([blob], image.name, { type: image.type });
            image = Object.assign(image, {
                preview: URL.createObjectURL(image)
            });
        }

        props.onUploadCallback(image);
        props.onClose();
    }

    const handleClose = () => {
        props.onClose();
    }

    const wrapperRef = useRef(null);
    useOutSideClickAlert(wrapperRef, props.onClose);

    return (
        <div className={style.get_image_file} data-testid="get-image">
            <div ref={wrapperRef} className={style.drop_container} >
                <div className={style.close_button_container}>
                    <AiOutlineClose size={30} className={style.close_button} onClick={handleClose} />
                </div>
                <div {...getRootProps()} className={style.drop_zone}>
                    <input {...getInputProps()} />
                    <div className={style.drop_text}>
                        {images.length === 0 && <div>
                            Drag and drop your profile picture
                            <p style={{ fontSize: 16, fontWeight: "normal" }}>(only *.jpeg and *.png images are accepted)</p>
                        </div>}
                        <div className={style.images}> {images} </div>
                        {images.length === 0 && <RiDragDropLine size={150} className={style.drag_icon} />}
                    </div>
                </div>

                <div className={style.upload_button_container}>
                    <button className={images.length === 0 ? style.upload_button_disabled : style.upload_button} disabled={images.length === 0} onClick={handleUpload}>
                        Upload
                    </button>
                </div>


            </div>
        </div>
    )
}

export default GetImageFile