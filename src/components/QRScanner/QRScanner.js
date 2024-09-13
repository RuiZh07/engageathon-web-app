import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import "./QRScanner.scss";
import { FaArrowLeft } from "react-icons/fa6";

const QRScanner = ({ setIsCameraOpen, setActivityConfirmed }) => {
  const videoElementRef = useRef(null);
  const [scannedText, setScannedText] = useState("");
  const [isPermissionGranted, setIsPermissionGranted] = useState(true);

  useEffect(() => {
    const video = videoElementRef.current;
    const qrScanner = new QrScanner(
      video,
      (result) => {
        setScannedText(result.data);
        setActivityConfirmed(result.data)
        setIsCameraOpen(false)
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );
    const startCamera = async () => {
      qrScanner.start().catch(() => {
        setIsPermissionGranted(false);
      });
    };

    startCamera();

    return () => {
      if (isPermissionGranted) {
        qrScanner.stop();
        qrScanner.destroy();
      }
    };
  }, []);

  return (
    <div
      className="videoWrapper"
      style={!isPermissionGranted ? { backgroundColor: "#fff" } : {}}
    >
      <FaArrowLeft
        size={26}
        color="#000"
        className="backIcon"
        onClick={() => setIsCameraOpen(false)}
      />
      {isPermissionGranted && (
        <video className="qrVideo" ref={videoElementRef} />
      )}
      {!isPermissionGranted && (
        <p style={{ fontSize: "24px" }}>
          Please grant permission for the camera
        </p>
      )}
    </div>
  );
};

export default QRScanner;
