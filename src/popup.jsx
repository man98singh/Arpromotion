import React, { useState } from 'react';
import './popup.css';  // Import the popup.css file

const ConsentPopup = ({ onAgree }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = () => {
        if (isChecked) {
            onAgree(); // Call the onAgree function passed from App component
            setIsVisible(false); // Close the popup
        } else {
            alert("You must agree to the terms to proceed.");
        }
    };

    return (
        isVisible && (
            <div className="popup">
                  <img src="/buttons/popupbuttonAsset 7.png" alt="Logo" className="popup-image" />
                <h2>Consent Agreement latest</h2>
                <p>
                    By entering this application, you agree to abide by all conditions set forth. 
                    Please confirm your agreement by checking the box below.
                </p>
                <label>
                    <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={handleCheckboxChange} 
                    />
                    I agree to follow all conditions
                </label>
                <div className="button-container">
                    <button onClick={handleSubmit} className="button">
                        Submit
                    </button>
                </div>
            </div>
        )
    );
};

export default ConsentPopup;
