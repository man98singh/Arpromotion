import React, { useState } from 'react';

const Details = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            // Reset input fields after successful submission
            setName('');
            setEmail('');
            setNumber('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%', 
            zIndex: 3, // Ensure it is on top of the preview
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light background for visibility
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' // Optional shadow for better visibility
        }}>
            <h2>Submit Your Details</h2>
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="number">Number:</label>
                    <input
                        type="text"
                        id="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <style>
                {`
                    form {
                        display: flex;
                        flex-direction: column;
                        width: 100%; // Full width of parent
                    }

                    div {
                        margin-bottom: 15px;
                    }

                    input {
                        padding: 10px;
                        font-size: 16px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        width: 100%; // Full width for inputs
                    }

                    button {
                        padding: 12px 24px;
                        font-size: 16px;
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }

                    button:hover {
                        background-color: #0056b3;
                    }

                    @media (max-width: 600px) {
                        h2 {
                            font-size: 18px; // Smaller title for mobile
                        }

                        input, button {
                            font-size: 14px; // Smaller font for mobile
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Details;
