import React, { useEffect, useRef, useState } from 'react';
import { bootstrapCameraKit } from '@snap/camera-kit';
import './snapstyle.css';
import PreviewComponent from './PreviewComponent';

const CameraComponent = () => {
    const liveRenderTargetRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [cameraFacingMode, setCameraFacingMode] = useState('environment');
    const sessionRef = useRef(null);

    // Function to set up the camera
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
                sessionRef.current.stop();
            }
        };
    }, [cameraFacingMode]);

    const captureImage = async () => {
        const canvas = liveRenderTargetRef.current;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        const imageUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageUrl); // Store captured image URL
    };

    const toggleCamera = () => {
        setCameraFacingMode(prevMode => (prevMode === 'environment' ? 'user' : 'environment'));
    };

    const handleBack = async () => {
        setCapturedImage(null); // Reset captured image
        await setupCamera(); // Restart the camera feed
    };

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <canvas ref={liveRenderTargetRef} id="canvas" style={{ width: '100%', height: '100%' }} />
            
            {/* Show PreviewComponent if image is captured */}
            {capturedImage ? (
                <PreviewComponent capturedImage={capturedImage} onBack={handleBack} />
            ) : (
                <div className="button-container">
                    <button className="capture-button" onClick={captureImage}>Capture</button>
                    <button className="toggle-button" onClick={toggleCamera}>Toggle Camera</button>
                </div>
            )}
        </div>
    );
};

export default CameraComponent;
