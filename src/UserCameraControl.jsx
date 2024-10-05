// import { useState, useRef } from 'react';
// import { setupCamera } from './CameraService';

// export const useCameraControls = () => {
//     const liveRenderTargetRef = useRef(null);
//     const sessionRef = useRef(null);
//     const [capturedImage, setCapturedImage] = useState(null);
//     const [cameraFacingMode, setCameraFacingMode] = useState('environment');

//     const initializeCamera = async () => {
//         if (!liveRenderTargetRef.current) {
//             console.error('Canvas element is not ready.');
//             return;
//         }

//         // Initialize the camera session if it's not already set up
//         if (!sessionRef.current) {
//             await setupCamera(cameraFacingMode, liveRenderTargetRef, sessionRef);
//         }
//     };

//     const captureImage = () => {
//         const canvas = liveRenderTargetRef.current;
//         if (canvas) {
//             const imageUrl = canvas.toDataURL('image/png');
//             setCapturedImage(imageUrl);  // Capture and store the image
//         }
//     };

//     const toggleCamera = () => {
//         setCameraFacingMode(prevMode => (prevMode === 'environment' ? 'user' : 'environment'));
//         resetCamera();
//         initializeCamera();
//     };

//     const resetCamera = () => {
//         setCapturedImage(null);
//         if (sessionRef.current) {
//             sessionRef.current.stop();
//             sessionRef.current = null;  // Clean up the session
//         }
//     };

//     return {
//         liveRenderTargetRef,
//         capturedImage,
//         initializeCamera,
//         captureImage,
//         toggleCamera,
//         resetCamera,
//     };
// };
