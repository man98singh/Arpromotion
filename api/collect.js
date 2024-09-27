import pg from 'pg';

const apistring = process.env.DATABASE_URL;

if (!apistring) {
    console.error("DATABASE_URL environment variable not set.");
    process.exit(1); // Exit if database connection string is not available
}

const { Client } = pg;
const client = new Client({
    connectionString: apistring,
});

// Attempt to connect and handle connection errors
client.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit the process on connection failure
    } else {
        console.log('Connected to PostgreSQL database successfully');
    }
});//here we go again

export default async (req, res) => {
    if (req.method === 'POST') {
        const { body } = req;
        if (!body) {
            return res.status(400).json({ message: 'Request body is required' });
        }

        const { name, email, number } = body;

        try {
            const query = 'INSERT INTO users (name, email, number) VALUES ($1, $2, $3)';
            const values = [name, email, number];
            await client.query(query, values);

            res.status(200).json({ message: 'Details submitted successfully!' });
        } catch (error) {
            console.error('Database insert error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        res.status(200).json({ message: 'GET request to /api/collectdetails successful!' });
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
