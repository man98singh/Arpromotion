import React from 'react';

const CaptureControls = ({ onCapture, onToggleCamera }) => {
    return (
        <div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 1 }}>
            <button className="capture-button" onClick={onCapture}>Capture</button>
            <button className="toggle-button" onClick={onToggleCamera}>SWitchCamera</button>
        </div>
    );
};

export default CaptureControls;