import React, { useState, useRef } from 'react';

import { boostrapCameraKit } from "@snap/camera-kit";

const CameraCapture = () => {
  (async function main() {
    const apiToken = "Your API Token value copied from the Camera Kit Portal";
    const cameraKit = await bootstrapCameraKit({ apiToken });
  
    const canvas = document.getElementById("my-canvas");
  const session = await cameraKit.createSession(canvas);
  
  
  })();
  const [image, setImage] = useState(null); // To store the captured image
  const [viberNumber, setViberNumber] = useState(''); // To store the Viber number input
  const videoRef = useRef(null); // To control the video element
  const canvasRef = useRef(null); // To take a snapshot from the video
  
  // Access the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera: ', error);
    }
  };
  
  // Capture image from video
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = canvas.toDataURL('image/png');
    setImage(imageData); // Set the captured image for preview
  };

  // Open iOS Share Sheet and share the captured image via Viber or other apps
  const shareToViber = async () => {
    if (!image) {
      alert('Please capture an image first.');
      return;
    }

    const blob = await fetch(image).then(res => res.blob());
    const file = new File([blob], 'captured_image.png', { type: 'image/png' });

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Share Image',
          text: 'Sharing the captured image',
          files: [file], // Attach the captured image
        });
      } catch (error) {
        console.error('Error sharing image: ', error);
      }
    } else {
      alert('Sharing is not supported in this browser.');
    }
  };

  return (
    <div>
      <h1>Camera Capture & Share to Viber</h1>
      
      <div>
        <video ref={videoRef} autoPlay style={{ width: '100%' }}></video>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>
      
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture Image</button>

      {/* Preview the captured image */}
      {image && (
        <div>
          <h3>Captured Image:</h3>
          <img src={image} alt="Captured" style={{ width: '300px' }} />
        </div>
      )}
      
      {/* Share button to trigger iOS Share Sheet */}
      <div>
        <button onClick={shareToViber}>Share Image</button>
      </div>
    </div>
  );
};

export default CameraCapture;
