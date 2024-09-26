import React, { useState } from 'react';
import CameraComponent from './snap'; // Adjust the import based on your file structure
import ConsentPopup from './popup';

const App = () => {
    const [hasAgreed, setHasAgreed] = useState(false);

    const handleAgreement = () => {
        setHasAgreed(true);
    };

    return (
        <div>
            {!hasAgreed ? (
                <ConsentPopup onAgree={handleAgreement} />
            ) : (
                <CameraComponent />
            )}
        </div>)}
   
export default App
