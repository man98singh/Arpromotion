import React, { useEffect, useRef, useState } from 'react';
import { bootstrapCameraKit } from '@snap/camera-kit';
import PreviewComponent from './PreviewComponent'; // Importing the PreviewComponent
import Details from './details'; // Importing the Details component
import './snapstyle.css';

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

        // Try applying the lens
        try {
            const lens = await cameraKit.lensRepository.loadLens(
                '8da5d561-1b8d-4391-8ea2-32906c0c718f',
                'f029c812-af38-419f-a7dc-5c953e78ea98'
            );
            await session.applyLens(lens);
        } catch (error) {
            console.error("Failed to apply lens:", error);
        }
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

    // New function to share captured images
    const shareImage = async () => {
        if (capturedImage) {
            // Create a temporary link to the image
            const blob = await fetch(capturedImage).then(res => res.blob());
            const file = new File([blob], 'captured-image.png', { type: 'image/png' });

            if (navigator.share) {
                // Use the Web Share API for sharing
                try {
                    await navigator.share({
                        title: 'Check out this image!',
                        text: 'Here is the image I captured.',
                        files: [file],
                    });
                    console.log('Image shared successfully');
                } catch (error) {
                    console.error('Error sharing the image:', error);
                }
            } else {
                alert('Sharing is not supported on this browser.');
            }
        }
    };

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            {capturedImage ? (
                // Render the PreviewComponent if an image is captured
                <>
                    <PreviewComponent capturedImage={capturedImage} onBack={handleBackToCamera} />
                    <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 4 }}>
                        <button className="share-button" onClick={shareImage}>Share Image</button>
                    </div>
                    {showDetails && <Details />} {/* Show Details component on top of PreviewComponent */}
                </>
            ) : (
                <>
                    <canvas ref={liveRenderTargetRef} id="canvas" style={{ width: '100%', height: '100%' }} />
                    
                    {/* Adjusted button container for better visibility */}
                    <div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 1 }}>
                        <button className="capture-button" onClick={captureImage}>Capture</button>
                        <button className="toggle-button" onClick={toggleCamera}>Toggle Camera</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CameraComponent;
