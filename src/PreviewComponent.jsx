import React from 'react';

const PreviewComponent = ({ capturedImage, onBack }) => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ color: 'white' }}>Captured Image:</h3>
            <img src={capturedImage} alt="Captured" style={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }} />
            <button className="back-button" onClick={onBack}>Back to Camera</button>
            <style>
                {`
                    .back-button {
                        padding: 12px 24px; /* Adjust padding for better visibility */
                        font-size: 16px; /* Font size */
                        margin-top: 20px;
                        background-color: rgba(255, 255, 255, 0.9); /* Light background for better contrast */
                        border: none; 
                        border-radius: 5px;
                        cursor: pointer;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                        color: #333; /* Text color */
                    }

                    .back-button:hover {
                        background-color: rgba(255, 255, 255, 1); /* Darker on hover */
                    }

                    @media (max-width: 600px) {
                        .back-button {
                            font-size: 14px; /* Adjusted font size for mobile */
                            padding: 10px 20px; /* Adjusted padding for mobile */
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default PreviewComponent;
