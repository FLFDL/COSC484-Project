import React, {useState, useRef} from 'react';
import Cropper from 'react-cropper'
import "cropperjs/dist/cropper.css"

    const UploadPhoto = ({getCroppedImg}) => {

    const cropperRef = useRef(null);
    const [image, setImage] = useState("");
    const [croppedImg, setCroppedImg] = useState("");

    const onImgChange = (e) => {
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                setImage(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const cropImage = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper){
            const croppedCanvas = cropper.getCroppedCanvas();
            setCroppedImg(croppedCanvas.toDataURL());
            
            //send cropped photo to parent form
            croppedCanvas.toBlob((photo) => {
                //send cropped img to parent form
                getCroppedImg(photo);
                
            }, 'image/jpeg');
            
            setImage("");
            setCroppedImg("");
            // clear the img and cropped so theyre not there after cropping
            //getCroppedImg = croppedImg;
        }
    }
    return (
    <>
        <label htmlFor="uploadPfp">Profile Photo</label>
        <input 
            id = "uploadPfp" 
            type = "file" 
            accept = "image/*"
            name = "pfp"
            onChange = {onImgChange}
        />

        {image && (
            <Cropper
                src = {image}
                aspectRatio={1/1}
                ref = {cropperRef}
                viewMode = {1}
                style = {{justifyContent: "center"}}
            />
        )}

        {croppedImg && (
            <div>
                <p>Your profile picture will be: </p>
                <img src = {croppedImg} style = {{maxWidth: "100%"}}/>
            </div>
            
        )}
        <button onClick = {cropImage} type = "button">Crop Photo</button>
        

    </>
  )
}

export default UploadPhoto