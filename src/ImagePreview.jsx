import React, { useState } from 'react';

const ImagePreview = ({ capturedImage, onBack, onContinue }) => {
    const [email, setEmail] = useState('');

    const handleShareWithEmail = () => {
        if (email) {
            const subject = 'Check out this image!';
            const body = `Here is the image I captured: ${capturedImage}`;
            window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        } else {
            alert('Please enter an email address to share the image.');
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
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                <button className="back-button" onClick={onBack}>Back to Camera</button>
                {/* Email input field for sharing */}
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email to share" 
                    style={{ 
                        margin: '10px', 
                        padding: '10px', 
                        width: '80%', 
                        zIndex: 1, 
                        position: 'relative' 
                    }}
                />
                <button className="share-button" onClick={handleShareWithEmail}>Share Image</button>
                <button className="continue-button" onClick={onContinue}>Continue</button>
            </div>
        </>
    );
};

export default ImagePreview;
