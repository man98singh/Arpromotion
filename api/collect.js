import pg from 'pg';

const { Client } = pg;

// A function to create a new database client and connect
const connectToDatabase = async () => {
    const apistring = process.env.DATABASE_URL;

    if (!apistring) {
        throw new Error("DATABASE_URL environment variable not set.");
    }

    const client = new Client({
        connectionString: apistring,
        ssl: { rejectUnauthorized: false }
    });

    await client.connect();
    return client;
};

export default async (req, res) => {
    if (req.method === 'POST') {
        const { body } = req;

        if (!body) {
            return res.status(400).json({ message: 'Request body is required' });
        }

        const { name, email, number } = body;

        try {
            // Connect to the database for this request
            const client = await connectToDatabase();
            const query = 'INSERT INTO users (name, email, pnum) VALUES ($1, $2, $3)';
            const values = [name, email, number];
            
            // Execute the query
            await client.query(query, values);

            // Close the connection
            await client.end();

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
