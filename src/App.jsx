import React, { useState } from 'react';
import ConsentPopup from './popup';
import CameraComponent from './CameraComponent';
import Details from './details';

const App = () => {
    const [hasAgreed, setHasAgreed] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const handleAgreement = () => {
        setHasAgreed(true);
    };

    const handleImageCapture = (imageUrl) => {
        setCapturedImage(imageUrl);
    };

    const handleContinue = () => {
        setShowDetails(true);
    };

    const handleBackToCamera = () => {
        setCapturedImage(null);
        setShowDetails(false);
    };

    const shareImage = async (emailAddress) => {
        if (capturedImage) {
            const blob = await fetch(capturedImage).then(res => res.blob());
            const file = new File([blob], 'captured-image.png', { type: 'image/png' });

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Check out this image!',
                        text: `Here is the image I captured. Send it to: ${emailAddress}`,
                        files: [file],
                        url: window.location.href
                    });
                    console.log('Image shared successfully');
                } catch (error) {
                    console.error('Error sharing the image:', error);
                    openEmailClient(emailAddress); // Fallback
                }
            } else {
                openEmailClient(emailAddress); // Fallback
            }
        }
    };

    return (
        <div>
            {!hasAgreed ? (
                <ConsentPopup onAgree={handleAgreement} />
            ) : (
                <>
                    {!showDetails ? (
                        <CameraComponent 
                            onImageCapture={handleImageCapture}
                            capturedImage={capturedImage}
                            onBackToCamera={handleBackToCamera}
                            onContinue={handleContinue}
                        />
                    ) : (
                        <Details capturedImage={capturedImage} onShare={shareImage} />
                    )}
                </>
            )}
        </div>
    );
};

export default App;
