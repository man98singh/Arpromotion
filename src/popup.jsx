import React, { useState } from 'react';
import CameraComponent from './snap';
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
            <div style={styles.popup}>
                <h2>Consent Agreement</h2>
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
                <div style={styles.buttonContainer}>
                    <button onClick={handleSubmit} style={styles.button}>
                        Submit
                    </button>
                </div>
            </div>
        )
    );
};

const styles = {
    popup: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
    },
    buttonContainer: {
        marginTop: '20px',
        textAlign: 'center',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
    },
};
export default ConsentPopup;
