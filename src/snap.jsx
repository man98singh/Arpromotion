import React, { useEffect, useRef, useState } from 'react';
import { bootstrapCameraKit } from '@snap/camera-kit';

const CameraComponent = () => {
    const liveRenderTargetRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    useEffect(() => {
        const setupCamera = async () => {
            const cameraKit = await bootstrapCameraKit({
                apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA1MTUxMzg0LCJzdWIiOiI3NDRiZTczYS1iODlmLTRkYzAtYjk1MC0yMDIyNGY2NjJjMGF-U1RBR0lOR35iZGM2ZTgyOS1iYTdhLTRmNDgtOGVlMC0wZWMyYjFlMjE1ZTYifQ.6HxXxLjUNOD9IV73x8tFcF11P4jDYGeD--7kW02iGho'
            });

            const session = await cameraKit.createSession({
                liveRenderTarget: liveRenderTargetRef.current
            });

            // // Set video constraints to 1280x720 (16:9 aspect ratio)
            // const videoConstraints = {
            //     width: { ideal: 1280 },
            //     height: { ideal: 720 },
            //     aspectRatio: 16 / 9
            // };

            const mediaStream = await navigator.mediaDevices.getUserMedia({
            
            });

            await session.setSource(mediaStream);
            await session.play();
           

            const lens = await cameraKit.lensRepository.loadLens(
                '417fb322-bd74-446a-a15d-86d18dce3f7a',
                'f029c812-af38-419f-a7dc-5c953e78ea98'
            );

            await session.applyLens(lens);
        };

        setupCamera();

        return () => {
            // Cleanup if necessary (e.g., stop the session)
        };
    }, []);

    const captureImage = async () => {
        const canvas = liveRenderTargetRef.current;
    
        // Ensure AudioContext is resumed after user gesture
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }
        
        const imageUrl = canvas.toDataURL('image/png'); // Capture image from the canvas
        setCapturedImage(imageUrl); // Update the captured image state
    
    };

    return (
        <div>
            <canvas ref={liveRenderTargetRef} id="canvas" style={{ width: '1280px', height: '720px' }} />
            <button className="capture-button" onClick={captureImage}>Capture</button>
            {capturedImage && (
                <div>
                    <h3>Captured Image:</h3>
                    <img src={capturedImage} alt="Captured" style={{ width: '100%', maxWidth: '600px' }} />
                </div>
            )}
            <style>
                {`
                    .capture-button {
                        padding: 10px 20px;
                        font-size: 16px;
                        margin: 5px;
                    }

                    @media (max-width: 600px) {
                        .capture-button {
                            font-size: 14px;
                            padding: 8px 16px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default CameraComponent;
