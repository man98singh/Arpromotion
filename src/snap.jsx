import React, { useEffect, useRef, useState } from 'react';
import { bootstrapCameraKit } from '@snap/camera-kit';
import PreviewComponent from './PreviewComponent'; // Importing the PreviewComponent
import Details from './details';// Importing the Details component

const CameraComponent = () => {
    const liveRenderTargetRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [cameraFacingMode, setCameraFacingMode] = useState('environment'); // Default to rear camera
    const [showDetails, setShowDetails] = useState(false); // State to control details visibility
    const sessionRef = useRef(null); // Ref to store the camera session

    // Function to setup the camera session
    const setupCamera = async () => {
        const cameraKit = await bootstrapCameraKit({
            apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA1MTUxMzg0LCJzdWIiOiI3NDRiZTczYS1iODlmLTRkYzAtYjk1MC0yMDIyNGY2NjJjMGF-U1RBR0lOR35iZGM2ZTgyOS1iYTdhLTRmNDgtOGVlMC0wZWMyYjFlMjE1ZTYifQ.6HxXxLjUNOD9IV73x8tFcF11P4jDYGeD--7kW02iGho'
             // Ensure you replace this with your actual API token
        });

        const session = await cameraKit.createSession({
            liveRenderTarget: liveRenderTargetRef.current
        });
        sessionRef.current = session; // Store session for cleanup

        // Set video constraints
        const videoConstraints = {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: cameraFacingMode
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: videoConstraints
        });

        await session.setSource(mediaStream);
        await session.play();

        const lens = await cameraKit.lensRepository.loadLens(
            '48b170de-f6f8-4e6a-a57b-be18b322d148',
            'f029c812-af38-419f-a7dc-5c953e78ea98'
        );

        await session.applyLens(lens);
    };

    useEffect(() => {
        setupCamera();

        return () => {
            if (sessionRef.current) {
                sessionRef.current.stop(); // Cleanup the session on unmount
            }
        };
    }, [cameraFacingMode]);

    const captureImage = async () => {
        const canvas = liveRenderTargetRef.current;

        // Ensure AudioContext is resumed after user gesture
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        const imageUrl = canvas.toDataURL('image/png'); // Capture image from the canvas
        setCapturedImage(imageUrl); // Update the captured image state
        setShowDetails(true); // Show the Details component after capturing the image
    };

    const toggleCamera = () => {
        setCameraFacingMode(prevMode => (prevMode === 'environment' ? 'user' : 'environment'));
    };

    const handleBackToCamera = () => {
        setCapturedImage(null); // Clear the captured image to go back to the camera
        setShowDetails(false); // Hide the Details component when going back
        setupCamera(); // Restart the camera session
    };

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            {capturedImage ? (
                // Render the PreviewComponent if an image is captured
                <>
                    <PreviewComponent capturedImage={capturedImage} onBack={handleBackToCamera} />
                    {showDetails } {/* Show Details component on top of PreviewComponent */}
                </>
            ) : (
                <>
                    <canvas ref={liveRenderTargetRef} id="canvas" style={{ width: '100%', height: '100%' }} />
                    
                    {/* Adjusted button container for better visibility */}
                    <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 1 }}>
                        <button className="capture-button" onClick={captureImage}>Capture</button>
                        <button className="toggle-button" onClick={toggleCamera}>Toggle Camera</button>
                    </div>
                </>
            )}

            <style>
                {`
                    .capture-button, .toggle-button {
                        padding: 15px 30px; /* Increased padding for better visibility */
                        font-size: 18px; /* Increased font size */
                        background-color: rgba(255, 255, 255, 0.8); /* Light background for better contrast */
                        border: none; 
                        border-radius: 5px;
                        cursor: pointer;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    }

                    .capture-button:hover, .toggle-button:hover {
                        background-color: rgba(255, 255, 255, 1); /* Slightly darker on hover */
                    }

                    @media (max-width: 600px) {
                        .capture-button, .toggle-button {
                            font-size: 16px;
                            padding: 12px 24px; /* Adjusted padding for mobile */
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default CameraComponent;
