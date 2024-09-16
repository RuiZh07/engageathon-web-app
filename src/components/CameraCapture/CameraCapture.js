import React,{ useEffect, useRef, useState, useCallback } from "react";
import { MdCancel } from "react-icons/md";
import Webcam from 'react-webcam';
import CustomCameraIcon from "../CustomCameraIcon";
import MainButton from "../MainButton/MainButton";
import { MdFlipCameraAndroid } from "react-icons/md";
import "./CameraCapture.scss";

const CameraCapture = ({ setIsCameraCaptureOpen, setIsCameraOpen }) => {
  const webcamRef = useRef(null);
  const [isPhotoCaptured, setIsPhotoCaptured] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState('');
  const [facingMode, setFacingMode] = useState('user');

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhotoDataUrl(imageSrc);
    setIsPhotoCaptured(true);
  }, [webcamRef]);

  const handleSharePhoto = () => {
    console.log('Share Photo button clicked');
    setIsCameraCaptureOpen(false);
    setIsCameraOpen(true);
  };

  const toggleCamera = () => {
    setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
  };

  const handleRetake = () => {
    setIsPhotoCaptured(false);
    setPhotoDataUrl('');
  };
  
  return (
    <div className="cameraWrapper">
      {isPhotoCaptured ? (
        <div className="photoPreviewWrapper">
          <img src={photoDataUrl} alt="Captured" className="capturedPhoto" />
          <div className="button-container">
            <MainButton title="Share Photo" onClick={handleSharePhoto} />
            <button className="retakeButton" onClick={handleRetake}>Retake</button>
          </div>
        </div>
      ) : (
        <>
          <MdCancel
            size={36}
            className="backIconCamera"
            onClick={() => setIsCameraCaptureOpen(false)}
          />
          <MdFlipCameraAndroid 
                size={36}
                className="flipIcon"
                onClick={toggleCamera} 
                />
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            width="100%"
            height="100%"
            videoConstraints={{ facingMode }}
            className="cameraVideo"
          />
          <div className="captureButtonWrapper">
            <CustomCameraIcon onClick={capturePhoto} />
          </div>
        </>
      )}
    </div>
  );
};

export default CameraCapture;
