 import React, { useEffect, useRef, useState } from 'react';
import { bootstrapCameraKit } from '@snap/camera-kit';
            
            const CameraComponent = () => {
                const liveRenderTargetRef = useRef(null);
                const [capturedImage, setCapturedImage] = useState(null);
                const [cameraFacingMode, setCameraFacingMode] = useState('environment'); // Default to rear camera
                const sessionRef = useRef(null); // Ref to store the camera session
            
                useEffect(() => {
                    const setupCamera = async () => {
                        const cameraKit = await bootstrapCameraKit({
                            apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA1MTUxMzg0LCJzdWIiOiI3NDRiZTczYS1iODlmLTRkYzAtYjk1MC0yMDIyNGY2NjJjMGF-U1RBR0lOR35iZGM2ZTgyOS1iYTdhLTRmNDgtOGVlMC0wZWMyYjFlMjE1ZTYifQ.6HxXxLjUNOD9IV73x8tFcF11P4jDYGeD--7kW02iGho'
            
                        });
            
                        const session = await cameraKit.createSession({
                            liveRenderTarget: liveRenderTargetRef.current
                        });
                        sessionRef.current = session; // Store session for cleanup
            
                        // Set video constraints to 1280x720 (16:9 aspect ratio)
                        const videoConstraints = {
                            width: { ideal: 1920 },
                            height: { ideal: 1080 },
                            facingMode: cameraFacingMode // Set the facing mode
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
            
                    setupCamera();
            
                    return () => {
                        if (sessionRef.current) {
                            sessionRef.current.stop(); // Cleanup the session
                        }
                    };
                }, [cameraFacingMode]); // Re-run setupCamera when cameraFacingMode changes
            
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
            
                const toggleCamera = () => {
                    setCameraFacingMode(prevMode => (prevMode === 'environment' ? 'user' : 'environment'));
                };
            
                return (
                    <div>
                        <canvas ref={liveRenderTargetRef} id="canvas" style={{ width: '1280px', height: '720px' }} />
                        <button className="capture-button" onClick={captureImage}>Capture</button>
                        <button className="toggle-button" onClick={toggleCamera}>Toggle Camera</button>
                        {capturedImage && (
                            <div>
                                <h3>Captured Image:</h3>
                                <img src={capturedImage} alt="Captured" style={{ width: '100%', maxWidth: '600px' }} />
                            </div>
                        )}
                        <style>
                            {`
                                .capture-button, .toggle-button {
                                    padding: 10px 20px;
                                    font-size: 16px;
                                    margin: 5px;
                                }
            
                                @media (max-width: 600px) {
                                    .capture-button, .toggle-button {
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
            

