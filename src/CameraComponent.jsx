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

        // iOS-specific adjustments
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            const videoTrack = mediaStream.getVideoTracks()[0];
            const capabilities = videoTrack.getCapabilities();
            if (capabilities.deviceId) {
                await videoTrack.applyConstraints({
                    advanced: [{ zoom: 1 }] // Reset zoom
                });
            }
        }

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

    // Rest of the component remains the same...
};

export default CameraComponent;