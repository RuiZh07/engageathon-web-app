import { useEffect, useRef, useState } from "react";
import "./CameraCapture.scss";
import { MdCancel } from "react-icons/md";
import CustomCameraIcon from "../CustomCameraIcon";
import MainButton from "../MainButton/MainButton";

const CameraCapture = ({ setIsCameraCaptureOpen, setIsCameraOpen }) => {
  const videoElementRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPermissionGranted, setIsPermissionGranted] = useState(true);
  const [isPhotoCaptured, setIsPhotoCaptured] = useState(false);
  const [photoDataUrl, setPhotoDataUrlState] = useState("");

  useEffect(() => {
    const video = videoElementRef.current;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (video) {
          video.srcObject = stream;
          video.play();
          setIsCameraCaptureOpen(true);
        }
        
      } catch (error) {
        console.error('Error accessing camera:', error);
        setIsPermissionGranted(false);
      }
    };

    startCamera();

    return () => {
      if (video && video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
      }
    };
  }, [setIsCameraCaptureOpen, setIsPermissionGranted]);

  const takePhoto = async () => {
    if (videoElementRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoElementRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const photoDataUrl = canvas.toDataURL("image/png");

      setPhotoDataUrlState(photoDataUrl);
      setIsPhotoCaptured(true);
    }
  };
  
  const handleSharePhoto = async () => {
    console.log("Share Photo button clicked");
    setIsCameraCaptureOpen(false); 
    setIsCameraOpen(true);
  };
  
  return (
    <div className="cameraWrapper"
      style={!isPermissionGranted ? { backgroundColor: "#fff" } : {}}
    >
      {isPhotoCaptured ? (
        <div className="photoPreviewWrapper">
          <img src={photoDataUrl} alt="Captured" className="capturedPhoto" />
          <div className="button-container">
           <MainButton title="Share Photo" onClick={handleSharePhoto} />
          </div>
        </div>
      ) : (
        <>
          <MdCancel
            size={40}
            className="backIconCamera"
            onClick={() => setIsCameraCaptureOpen(false)}
          />
          {isPermissionGranted ? (
            <>
              <video className="cameraVideo" ref={videoElementRef} />
              <div className="captureButtonWrapper">
                <CustomCameraIcon onClick={takePhoto} />
              </div>
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </>
          ) : (
            <p style={{ fontSize: "22px", color: '#FFFFFF' }}>
              Please grant permission for the camera
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CameraCapture;
