import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js'; // Import your database connection

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Home Page Route
app.get('/', async (req, res) => {
    try {
        // Fetch Hero Slider Data (Optional: you can keep this hardcoded or move to a 'hero' category in DB)
        const carouselData = [
            { id: 1, splitAsset: '/images/hero-split-dasher.jpg', collection: 'The Dasher Collection', title: 'Ready. Set. Take your time.', ctaMen: '/men', ctaWomen: '/women' },
            { id: 2, splitAsset: '/images/hero-split-runner.jpg', collection: 'Introducing Varsity Airy', title: 'Breathable By Nature', ctaMen: '/men', ctaWomen: '/women' }
        ];

        // Fetch Featured Products (The big shoe slider)
        const productRes = await pool.query("SELECT * FROM products WHERE category = 'featured' ORDER BY id ASC");
        
        // Fetch Explore More Data (The 7+ cards slider)
        const exploreRes = await pool.query("SELECT * FROM products WHERE category = 'explore' ORDER BY id ASC");

        res.render('index', { 
            slides: carouselData, 
            products: productRes.rows, 
            explore: exploreRes.rows 
        });
    } catch (err) {
        console.error("Database Error (Home):", err.message);
        res.status(500).send("Server Error");
    }
});

// Men's Collection Route
app.get('/men', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products WHERE category = 'men' ORDER BY id ASC");
        res.render('men', { products: result.rows });
    } catch (err) {
        console.error("Database Error (Men):", err.message);
        res.status(500).send("Server Error");
    }
});

// Women's Collection Route
app.get('/women', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products WHERE category = 'women' ORDER BY id ASC");
        res.render('women', { products: result.rows });
    } catch (err) {
        console.error("Database Error (Women):", err.message);
        res.status(500).send("Server Error");
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Knotical is running at http://localhost:${PORT}`));