import React, { useEffect, useRef, useState } from 'react';
import { bootstrapCameraKit } from '@snap/camera-kit';
import PreviewComponent from './PreviewComponent';

const CameraComponent = () => {
    const liveRenderTargetRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [cameraFacingMode, setCameraFacingMode] = useState('environment');
    const sessionRef = useRef(null);

    // Function to set up the camera session
    const setupCamera = async () => {

        const cameraKit = await bootstrapCameraKit({
            apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA1MTUxMzg0LCJzdWIiOiI3NDRiZTczYS1iODlmLTRkYzAtYjk1MC0yMDIyNGY2NjJjMGF-U1RBR0lOR35iZGM2ZTgyOS1iYTdhLTRmNDgtOGVlMC0wZWMyYjFlMjE1ZTYifQ.6HxXxLjUNOD9IV73x8tFcF11P4jDYGeD--7kW02iGho'
            
        });

        const session = await cameraKit.createSession({
            liveRenderTarget: liveRenderTargetRef.current
        });
        sessionRef.current = session;

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
        const imageUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageUrl);
    };

    const toggleCamera = () => {
        setCameraFacingMode(prevMode => (prevMode === 'environment' ? 'user' : 'environment'));
    };

    if (capturedImage) {
        return (
            <PreviewComponent
                capturedImage={capturedImage}
                onBack={() => {
                    setCapturedImage(null);
                    setupCamera(); // Restart the camera session
                }}
            />
        );
    }

    return (
        <div className="camera-container"> {/* Changed container class for styling */}
            <canvas ref={liveRenderTargetRef} id="canvas" className="live-canvas" /> {/* Added class for styling */}
            <div className="controls"> {/* Added a controls div for better layout */}
                <button className="capture-button" onClick={captureImage}>Capture</button>
                <button className="toggle-button" onClick={toggleCamera}>Toggle Camera</button>
            </div>
            <div className="details-section"> {/* Added details section for scrolling */}
                <h3>Details Section</h3>
                <p>Scroll down for more details...</p>
                {/* Add your detailed content here */}
                
            </div>
            <style>
                {`
                    .camera-container { /* Changed to flex layout for responsive design */
                        display: flex;
                        flex-direction: column;
                        height: 100vh; /* Full height of the viewport */
                        overflow: hidden;
                        position: relative;
                    }

                    .live-canvas { /* Added responsive styling for the canvas */
                        flex: 1; /* Allow the canvas to expand */
                        width: 100%; /* Full width */
                        height: auto; /* Maintain aspect ratio */
                        position: absolute; /* Positioning to fill the container */
                        top: 0;
                        left: 0;
                    }

                    .controls { /* Added a div for control buttons */
                        display: flex;
                        justify-content: space-between; /* Space buttons apart */
                        position: absolute;
                        bottom: 20px; /* Position at the bottom */
                        left: 0;
                        right: 0;
                        padding: 0 20px; /* Padding for buttons */
                    }

                    .capture-button, .toggle-button { /* Updated button styles */
                        padding: 12px 20px;
                        font-size: 18px;
                        background-color: #ff4757; /* Button color */
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }

                    .capture-button:hover, .toggle-button:hover { /* Hover effects */
                        background-color: #ff6b81;
                    }

                    .details-section { /* Styles for the details section */
                        padding: 20px;
                        background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
                        max-height: 300px; /* Set a max height */
                        overflow-y: auto; /* Enable scrolling */
                        border-radius: 10px; /* Rounded corners */
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Shadow for depth */
                        position: relative;
                        z-index: 10; /* Ensure it appears above the canvas */
                    }

                    @media (max-width: 600px) { /* Responsive styles for smaller screens */
                        .capture-button, .toggle-button {
                            font-size: 16px;
                            padding: 10px 15px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default CameraComponent;
