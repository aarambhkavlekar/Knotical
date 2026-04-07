import pg from 'pg';

const pool = new pg.Pool({
    user: 'postgres',           // Your Postgres username
    host: 'localhost',
    database: 'knotical_db',    // Your Database name
    password: 'yourpassword',   // Your Postgres password
    port: 5432,
});

export default pool;