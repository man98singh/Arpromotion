import React, { useState, useRef } from 'react';

const CameraCapture = () => {
  const [image, setImage] = useState(null); // To store the captured image
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

  // Share via Web Share API
  const shareOnWhatsApp = async () => {
    if (!image) {
      alert('Please capture an image first.');
      return;
    }

    // Convert the data URL to a Blob for sharing
    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], 'image.png', { type: blob.type });

    // Check if Web Share API is supported
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: 'Check this image',
          text: 'Here is an image I captured!',
          files: [file],
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing is not supported on your device.');
    }
  };

  return (
    <div>
      <h1>Camera Capture & Share via WhatsApp</h1>
      
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
      
      <div>
        <button onClick={shareOnWhatsApp}>Share to WhatsApp</button>
      </div>
    </div>
  );
};

export default CameraCapture;
