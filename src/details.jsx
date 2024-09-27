import React, { useState } from 'react';

const Details = ({ capturedImage }) => { // Accepting capturedImage as a prop
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

            // Sharing functionality
            if (navigator.share) {
                const imageUrl = capturedImage; // Get the captured image URL

                // Sharing the image
                await navigator.share({
                    title: 'Shared Image and Details',
                    text: `Name: ${userDetails.name}, Email: ${userDetails.email}, Number: ${userDetails.number}`,
                    url: imageUrl, // This works only if the image is accessible via a URL
                });
            } else {
                alert('Sharing not supported on this browser.');
            }
        } catch (error) {
            console.error('Error:', error);
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
        </div>
    );
};

export default Details;
