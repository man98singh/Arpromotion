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
                  <img src="/buttons/popupbuttonAsset 7.png" alt="Logo" className="popup-image" onClick={handleSubmit} />
                <h2>Διαγωνισμός
                    για να είσαι μέσα σε όλα!
                    Λάβε μέρος!</h2>
                <p>
                Αποδέχομαι τους <a href=''>όρους</a>
                του διαγωνισμού.
                </p>
              
                <label>
                    <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={handleCheckboxChange} 
                    />
                   Επιθυμώ να λαμβάνω ενημερώσεις
                σχετικά με προϊόντα και
                νέες υπηρεσίες του Ομίλου ΔΕΗ.
                </label>
                {/* <div className="button-container">
                    <button onClick={handleSubmit} className="button">
                        Submit
                    </button>
                </div> */}
            </div>
        )
    );
};

export default ConsentPopup;
