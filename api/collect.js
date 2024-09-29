import pg from 'pg';

// Use the environment variable for the database connection string
const apistring = process.env.DATABASE_URL;

if (!apistring) {
    console.error("DATABASE_URL environment variable not set.");
    process.exit(1); // Exit if database connection string is not available
}

const { Client } = pg;
const client = new Client({
    connectionString: apistring,
    ssl: {
        rejectUnauthorized: false, // Adjust based on your security requirements
    },
});

// Attempt to connect and handle connection errors
client.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit the process on connection failure
    } else {
        console.log('Connected to PostgreSQL database successfully');
    }
});

// Main API function to handle requests
export default async (req, res) => {
    if (req.method === 'POST') {
        const { body } = req;

        if (!body) {
            return res.status(400).json({ message: 'Request body is required' });
        }

        const { name, email, number } = body; // Assuming 'number' corresponds to the 'pnum' field in the DB

        try {
            const query = 'INSERT INTO users (name, email, pnum) VALUES ($1, $2, $3)';
            const values = [name, email, number]; // Use 'number' here, which will be mapped to 'pnum'
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
