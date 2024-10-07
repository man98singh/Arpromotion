import React, { useEffect, useRef, useState } from 'react';
import { bootstrapCameraKit } from '@snap/camera-kit';

const CameraComponent = ({ onImageCapture, capturedImage, onBackToCamera, onContinue }) => {
    const [cameraFacingMode, setCameraFacingMode] = useState('environment');
    const sessionRef = useRef(null);
    const cameraKitRef = useRef(null);
    const lensRef = useRef(null);
    const liveRenderTargetRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        const initializeCameraKit = async () => {
            if (!cameraKitRef.current) {
                console.log('Initializing CameraKit');
                cameraKitRef.current = await bootstrapCameraKit({
                    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA1MTUxMzg0LCJzdWIiOiI3NDRiZTczYS1iODlmLTRkYzAtYjk1MC0yMDIyNGY2NjJjMGF-U1RBR0lOR35iZGM2ZTgyOS1iYTdhLTRmNDgtOGVlMC0wZWMyYjFlMjE1ZTYifQ.6HxXxLjUNOD9IV73x8tFcF11P4jDYGeD--7kW02iGho'
                });
                console.log('CameraKit initialized');
            }

            if (!lensRef.current) {
                console.log('Loading lens');
                lensRef.current = await cameraKitRef.current.lensRepository.loadLens(
                    '8da5d561-1b8d-4391-8ea2-32906c0c718f',
                    'f029c812-af38-419f-a7dc-5c953e78ea98'
                );
                console.log('Lens loaded');
            }

            if (isMounted) {
                setupCamera(liveRenderTargetRef);
            }
        };

        initializeCameraKit();

        return () => {
            isMounted = false;
        };
    }, []);

    const setupCamera = async (liveRenderTargetRef) => {
        console.log('Starting camera setup');
        if (!cameraKitRef.current || !lensRef.current) {
            console.error("CameraKit or Lens not initialized");
            return;
        }

        const session = await cameraKitRef.current.createSession({ liveRenderTarget: liveRenderTargetRef.current });
        sessionRef.current = session;
        console.log('Session created');

        const videoConstraints = {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: cameraFacingMode
        };

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
            console.log('MediaStream obtained');
            
            // Add a small delay before setting the source and applying the lens
            await new Promise(resolve => setTimeout(resolve, 500));

            await session.setSource(mediaStream);
            console.log('Source set to session');
            await session.play();
            console.log('Session playback started');

            // Add another small delay before applying the lens
            await new Promise(resolve => setTimeout(resolve, 500));

            console.log('Attempting to apply lens');
            await session.applyLens(lensRef.current);
            console.log('Lens applied successfully');
            
            forceCanvasUpdate();
        } catch (error) {
            console.error("Error in setupCamera:", error);
        }
    };

    const forceCanvasUpdate = () => {
        const canvas = document.getElementById('canvas'); // Make sure this is the correct ID
        if (canvas) {
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Force a repaint
            canvas.style.display = 'none';
            canvas.offsetHeight; // Trigger reflow
            canvas.style.display = '';
            console.log('Canvas update forced');
        }
    };

    useEffect(() => {
        const handleOrientationChange = () => {
            console.log('Orientation changed');
            setupCamera(liveRenderTargetRef);
        };

        window.addEventListener('orientationchange', handleOrientationChange);
        return () => window.removeEventListener('orientationchange', handleOrientationChange);
    }, []);

    const handleCaptureImage = (canvas) => {
        const imageUrl = canvas.toDataURL('image/png');
        onImageCapture(imageUrl);
    };

    const toggleCamera = async () => {
        console.log('Toggling camera');
        setCameraFacingMode(prevMode => (prevMode === 'environment' ? 'user' : 'environment'));
    
        if (sessionRef.current) {
            await sessionRef.current.pause();
            console.log('Session paused');
        }
    
        setTimeout(async () => {
            await setupCamera(liveRenderTargetRef);
            console.log('Camera toggled and setup complete');
        }, 500);
    };

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            {capturedImage ? (
                <ImagePreview 
                    capturedImage={capturedImage} 
                    onBack={onBackToCamera} 
                    onContinue={onContinue}
                />
            ) : (
                <>
                    <canvas id="canvas" ref={liveRenderTargetRef} style={{ width: '100%', height: '100%' }} />
                    <button onClick={() => handleCaptureImage(document.getElementById('canvas'))}>Capture</button>
                    <button onClick={toggleCamera}>Switch Camera</button>
                </>
            )}
        </div>
    );
};

export default CameraComponent;