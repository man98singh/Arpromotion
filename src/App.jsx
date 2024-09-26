import React, { useState } from 'react';
import CameraComponent from './snap'; // Adjust the import based on your file structure
import ConsentPopup from './popup';
import Details from './details';

const App = () => {
    const [hasAgreed, setHasAgreed] = useState(false);

    const handleAgreement = () => {
        setHasAgreed(true);
    };

    return (
        <div>
            {!hasAgreed ? (
                <ConsentPopup onAgree={handleAgreement} />
            ) : (<><CameraComponent/>
                <Details/>
            </>
            )}
        </div>)}
   
export default App
