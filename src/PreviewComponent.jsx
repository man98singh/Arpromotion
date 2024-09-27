import React from 'react';

const PreviewComponent = ({ capturedImage, onBack }) => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h3>Captured Image:</h3>
            <img src={capturedImage} alt="Captured" style={{ width: '100%', maxWidth: '600px' }} />
            <button className="back-button" onClick={onBack}>Back to Camera</button>
            <style>
                {`
                    .back-button {
                        padding: 10px 20px;
                        font-size: 16px;
                        margin-top: 20px;
                        background-color: rgba(255, 255, 255, 0.8); /* Background color */
                        border: none; 
                        border-radius: 5px;
                        cursor: pointer;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    }

                    .back-button:hover {
                        background-color: rgba(255, 255, 255, 1); /* Darker on hover */
                    }

                    @media (max-width: 600px) {
                        .back-button {
                            font-size: 14px;
                            padding: 8px 16px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default PreviewComponent;
