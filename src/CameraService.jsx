import { bootstrapCameraKit } from '@snap/camera-kit';

export const setupCamera = async (cameraFacingMode, liveRenderTargetRef, sessionRef) => {
    if (sessionRef.current) {
        // Stop and clean up the existing session before reinitializing
        sessionRef.current.stop();
        sessionRef.current = null; // Reset session reference
    }

    const cameraKit = await bootstrapCameraKit({
        apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA1MTUxMzg0LCJzdWIiOiI3NDRiZTczYS1iODlmLTRkYzAtYjk1MC0yMDIyNGY2NjJjMGF-U1RBR0lOR35iZGM2ZTgyOS1iYTdhLTRmNDgtOGVlMC0wZWMyYjFlMjE1ZTYifQ.6HxXxLjUNOD9IV73x8tFcF11P4jDYGeD--7kW02iGho'
              // Use your actual API token
    });

    const session = await cameraKit.createSession({
        liveRenderTarget: liveRenderTargetRef.current  // Pass the canvas to the camera session
    });

    sessionRef.current = session;  // Store the camera session reference

    const videoConstraints = {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        facingMode: cameraFacingMode  // Manage the camera mode (front/rear)
    };

    const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: videoConstraints
    });

    await session.setSource(mediaStream);  // Set the video stream to the session
    await session.play();  // Start the camera feed

    try {
        const lens = await cameraKit.lensRepository.loadLens(
            '8da5d561-1b8d-4391-8ea2-32906c0c718f', // Lens Group ID
            'f029c812-af38-419f-a7dc-5c953e78ea98'  // Lens ID
        );
        await session.applyLens(lens);  // Apply the lens to the camera feed
    } catch (error) {
        console.error("Failed to apply lens:", error);  // Log any errors applying the lens
    }
};
