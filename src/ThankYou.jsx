import React from 'react';
import "./Thankyou.css"
const ThankYou = ({ onReset }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Thank You!</h1>
            <p>Your image has been shared successfully.</p>
           
            <img src='/buttons/frestartAsset 15@3x.png' onClick={onReset} alt="restart" className='restart-button'></img>
        </div>
    );
};

export default ThankYou;
