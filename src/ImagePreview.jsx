import React from 'react';

const ImagePreview = ({ capturedImage, onBack, onShare }) => {
    return (
        <>
            <img src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 4, display: 'flex', gap: '10px' }}>
                <button className="back-button" onClick={onBack}>Back to Camera</button>
                <button className="share-button" onClick={onShare}>Share Image</button>
            </div>
        </>
    );
};

export default ImagePreview;