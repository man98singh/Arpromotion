import React, { useState, useRef } from 'react';

const CameraCapture = () => {
  const [image, setImage] = useState(null); // To store the captured image
  const [whatsAppNumber, setWhatsAppNumber] = useState(''); // To store the WhatsApp number input
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

  // Share via WhatsApp
  const shareOnWhatsApp = () => {
    if (!whatsAppNumber || !image) {
      alert('Please capture an image and provide a valid WhatsApp number.');
      return;
    }

    const encodedImage = encodeURIComponent(image); // Encode image to base64
    const whatsappLink = `https://wa.me/${whatsAppNumber}?text=Check%20this%20out&image=${encodedImage}`;

    window.open(whatsappLink, '_blank');
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
      
      {/* WhatsApp number input */}
      <div>
        <input
          type="text"
          placeholder="Enter WhatsApp number with country code"
          value={whatsAppNumber}
          onChange={(e) => setWhatsAppNumber(e.target.value)}
        />
        <button onClick={shareOnWhatsApp}>Share on WhatsApp</button>
      </div>
    </div>
  );
};

export default CameraCapture;
