import React, { useState } from 'react';

const ImagePreview = ({ capturedImage, onBack, onContinue, onShare }) => {
    const [email, setEmail] = useState('');

    const handleShare = () => {
        if (email && capturedImage) {
            onShare(email);  // Call onShare with the email address
        } else if (!email) {
            alert('Please enter an email address to share the image.');
        } else {
            alert('No image available to share.');
        }
    };
    

    return (
        <>
            <img src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ 
                position: 'absolute', 
                bottom: '40px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                zIndex: 4, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                width: '80%'
            }}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter email to share" 
                    style={{ 
                        padding: '10px', 
                        width: '100%', 
                        zIndex: 1
                    }}
                />
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', width: '100%' }}>
                    <button className="back-button" onClick={onBack}>Back to Camera</button>
                    <button className="share-button" onClick={handleShare}>Share</button>
                    <button className="continue-button" onClick={onContinue}>Continue</button>
                </div>
            </div>
        </>
    );
};

export default ImagePreview;