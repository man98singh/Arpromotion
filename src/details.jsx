import React, { useState } from 'react';

const Details = ({ capturedImage, onShare }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    // Regular expression for a valid phone number (10 digits)
    const phoneNumberRegex = /^[0-9]{10}$/;

    // Function to validate inputs
    const validateForm = () => {
        if (!name.trim()) {
            alert('Please enter your name.');
            return false;
        }
        if (!email.trim()) {
            alert('Please enter your email.');
            return false;
        }
        if (!number.trim()) {
            alert('Please enter your phone number.');
            return false;
        }
        if (!phoneNumberRegex.test(number)) {
            alert('Please enter a valid 10-digit phone number.');
            return false;
        }
        return true; // If all fields are valid
    };

    const handleSubmit = async () => {
        const userDetails = { name, email, number };

        try {
            const response = await fetch('/api/collect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            alert('Successfully registered!');
            // Reset input fields after successful submission
            setName('');
            setEmail('');
            setNumber('');
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    const handleShareClick = async () => {
        // Validate the form first
        const isFormValid = validateForm();

        if (isFormValid) {
            const isSubmitted = await handleSubmit(); // Submit the form

            if (isSubmitted && capturedImage) {
                onShare();  // Proceed with sharing if submission is successful
            } else if (!capturedImage) {
                alert('No image available to share.');
            }
        }
    };

    return (
        <div>
            <h2>Submit Your Details</h2>
            <form onSubmit={(e) => e.preventDefault()}>  {/* Prevent default form submission */}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="number">Phone Number:</label>
                    <input
                        type="text"
                        id="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </div>
            </form>

            {/* Share button triggers both form submission and image share */}
            <button onClick={handleShareClick} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>
                Share Image
            </button>
        </div>
    );
};

export default Details;
