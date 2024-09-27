import React from 'react';

const PreviewComponent = ({ capturedImage, onBack }) => {
    return (
        <div>
            <h3>Captured Image:</h3>
            <img src={capturedImage} alt="Captured" style={{ width: '100%', maxWidth: '600px' }} />
            <button className="back-button" onClick={onBack}>Back to Camera</button>
            <style>
                {`
                    .back-button {
                        padding: 10px 20px;
                        font-size: 16px;
                        margin-top: 20px;
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
