import React, { useEffect, useRef, useState } from 'react';
import { bootstrapCameraKit } from '@snap/camera-kit';
import LiveCamera from './LiveCamera';
import CaptureControls from './CaptureCamera';
import ImagePreview from './ImagePreview';
import './snapstyle.css';

const CameraComponent = ({ onImageCapture, capturedImage, onBackToCamera, onContinue }) => {
    const [cameraFacingMode, setCameraFacingMode] = useState('environment');
    const sessionRef = useRef(null);
    const setupCamera = async (liveRenderTargetRef) => {
        const cameraKit = await bootstrapCameraKit({
            apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA1MTUxMzg0LCJzdWIiOiI3NDRiZTczYS1iODlmLTRkYzAtYjk1MC0yMDIyNGY2NjJjMGF-U1RBR0lOR35iZGM2ZTgyOS1iYTdhLTRmNDgtOGVlMC0wZWMyYjFlMjE1ZTYifQ.6HxXxLjUNOD9IV73x8tFcF11P4jDYGeD--7kW02iGho'
        });
    
        const session = await cameraKit.createSession({ liveRenderTarget: liveRenderTargetRef.current });
        sessionRef.current = session;

        const videoConstraints = {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: cameraFacingMode
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
        await session.setSource(mediaStream);
        await session.play();

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
        return () => {
            if (sessionRef.current) {
                if (typeof sessionRef.current.stop === 'function') {
                    sessionRef.current.stop();
                } else if (sessionRef.current.source && typeof sessionRef.current.source.getTracks === 'function') {
                    sessionRef.current.source.getTracks().forEach(track => track.stop());
                }
                sessionRef.current = null;
            }
        };
    }, []);

    const handleCaptureImage = (canvas) => {
        const imageUrl = canvas.toDataURL('image/png');
        onImageCapture(imageUrl);
    };

    const [isSwitching, setIsSwitching] = useState(false);

    const toggleCamera = async () => {
        setIsSwitching(true);
        setCameraFacingMode(prevMode => (prevMode === 'environment' ? 'user' : 'environment'));
    
        if (sessionRef.current) {
            await sessionRef.current.stop();
            sessionRef.current = null;
        }
    
        setTimeout(async () => {
            await setupCamera(liveRenderTargetRef);
            setIsSwitching(false);
        }, 500);
    };
 

    const shareImage = async () => {
        if (capturedImage) {
            const blob = await fetch(capturedImage).then(res => res.blob());
            const file = new File([blob], 'captured-image.png', { type: 'image/png' });

            if (navigator.share) {
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
                <ImagePreview 
                    capturedImage={capturedImage} 
                    onBack={onBackToCamera} 
                    onShare={shareImage}
                    onContinue={onContinue}
                />
            ) : (
                <>
                    <LiveCamera 
                        setupCamera={setupCamera} 
                        cameraFacingMode={cameraFacingMode}
                    />
                    <CaptureControls 
                        onCapture={() => handleCaptureImage(document.getElementById('canvas'))}
                        onToggleCamera={toggleCamera}
                    />
                </>
            )}
              <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {isSwitching && <div className="loading-indicator">Switching Camera...</div>}
        {/* The rest of your component */}
    </div>
        </div>
    );
};

export default CameraComponent;