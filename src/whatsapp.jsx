import React, { useState, useRef } from 'react';

const CameraCapture = () => {
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

  // Open Viber with the entered number
  const openViber = () => {
    if (!viberNumber) {
      alert('Please provide a valid Viber number.');
      return;
    }

    const viberLink = `viber://chat?number=${viberNumber}`;
    window.open(viberLink, '_blank');
  };

  return (
    <div>
      <h1>Camera Capture and Viber test</h1>
      
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
      
      {/* Viber number input */}
      <div>
        <input
          type="text"
          placeholder="Enter Viber number"
          value={viberNumber}
          onChange={(e) => setViberNumber(e.target.value)}
        />
        <button onClick={openViber}>Open Viber</button>
      </div>
    </div>
  );
};

export default CameraCapture;
