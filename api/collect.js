// /api/collectdetails.js
import { Client } from 'pg';

const client = new Client({
    connectionString: 'postgresql://test-db_owner:d5MLEA1QaWPk@ep-long-meadow-a5jyiih3.us-east-2.aws.neon.tech/test-db?sslmode=require',
});

client.connect();

export default async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, number } = req.body;

        try {
            const query = 'INSERT INTO users (name, email, number) VALUES ($1, $2, $3)'; // Make sure to use your actual table name
            const values = [name, email, number];
            await client.query(query, values);

            res.status(200).json({ message: 'Details submitted successfully!' });
        } catch (error) {
            console.error('Database insert error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        // Respond with a simple message to verify the endpoint is reachable
        res.status(200).json({ message: 'GET request to /api/collectdetails successful!' });
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
