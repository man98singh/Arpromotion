import React from 'react';
import "./Thankyou.css"
const ThankYou = ({ onReset }) => {
    return (
        <div className="thankyou-container">
            <h1>Thank you!</h1>
           
            <img src='/buttons/frestartAsset 15@3x.png' onClick={onReset} alt="restart" className='restart-button'></img>
        </div>
    );
};

export default ThankYou;
