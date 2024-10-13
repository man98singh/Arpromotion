import React, { useState } from 'react';
import ConsentPopup from './popup';
import CameraComponent from './CameraComponent';
import Details from './details';
import ThankYou from './ThankYou';  
import './App.css';

const App = () => {
    const [hasAgreed, setHasAgreed] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false); 

    const handleAgreement = () => {
        setHasAgreed(true);
    };

    const handleImageCapture = (imageUrl) => {
        setCapturedImage(imageUrl);
    };

    const handleContinue = () => {
        if (capturedImage) {  // Ensure capturedImage is not null
            console.log('Navigating to Details page');
            setShowDetails(true);
        } else {
            console.error('No captured image available to continue.');
        }
    };

    const handleBackToCamera = () => {
        setCapturedImage(null);
        setShowDetails(false);
        console.log("its' triggering badck to camera");
    };

   

  
    const resetApp = () => {
        setHasAgreed(false);
        setCapturedImage(null);
        setShowDetails(false);
        setShowThankYou(false); 
    };

    return (
        <div>
            {!hasAgreed ? (
                <ConsentPopup onAgree={handleAgreement} />
            ) : showThankYou ? (  
                <ThankYou onReset={resetApp} />  
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
                        <Details 
                            capturedImage={capturedImage} 
                            onReset={resetApp} 
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default App;
