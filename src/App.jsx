import React, { useState } from 'react';
import ConsentPopup from './popup';
import CameraComponent from './CameraComponent';
import Details from './Details';

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
                        <Details />
                    )}
                </>
            )}
        </div>
    );
};

export default App;