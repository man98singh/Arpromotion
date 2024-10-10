import React from 'react';

const LiveCamera = ({ canvasRef, isCameraReady }) => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas 
                ref={canvasRef} 
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: isCameraReady ? 'block' : 'none' 
                }} 
            />
            {!isCameraReady && <div>Loading camera...</div>}
        </div>
    );
};

export default LiveCamera;