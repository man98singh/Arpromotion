import React from 'react';

const CaptureControls = ({ onCapture}) => {
    return (
        <div style={{ 
            position: 'absolute', 
            bottom: '252px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            display: 'flex', 
            gap: '10px', 
            zIndex: 1 
        }} className='capture-button-container'>
            <img 
                src="/buttons/fcameraAsset 12@2x.png"  
                alt="Capture"
                className="capture-button"
                onClick={onCapture}
                style={{ 
                    cursor: 'pointer'
                }} 
            />
        </div>
    );
};

export default CaptureControls;
