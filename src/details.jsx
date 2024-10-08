import React, { useState } from 'react';

const Details = ({ capturedImage, onShare }) => {
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

    const handleShareClick = () => {
        if (capturedImage) {
            onShare();
        } else {
            alert('No image available to share.');
        }
    };

    return (
        <div>
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

           
                    <button onClick={handleShareClick}>Share Image</button>
          
        </div>
    );
};

export default Details;
