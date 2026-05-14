import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js'; // Import your database connection
import bcrypt from 'bcryptjs';
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
const saltRounds = 10;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(session({

    secret: "knoticalsecret",

    resave: false,

    saveUninitialized: false,

    cookie: {
        secure: false
    }

}));

app.use((req, res, next) => {

    res.locals.user = req.session.user || null;

    next();

});
// Home Page Route
app.get('/', async (req, res) => {
    try {
        // Fetch Hero Slider Data (Optional: you can keep this hardcoded or move to a 'hero' category in DB)
        const carouselData = [
            { id: 1, splitAsset: '/images/hero-split-dasher.jpg', collection: 'The Dasher Collection', title: 'Ready. Set. Take your time.', ctaMen: '/men', ctaWomen: '/women' },
            { id: 2, splitAsset: '/images/hero-split-runner.jpg', collection: 'Introducing Varsity Airy', title: 'Breathable By Nature', ctaMen: '/men', ctaWomen: '/women' }
        ];

        // Fetch Featured Products (The big shoe slider)
        const productRes = await pool.query("SELECT * FROM products WHERE tag = 'Best-seller' ORDER BY id ASC");
        
        // Fetch Explore More Data (The 7+ cards slider)
        const exploreRes = await pool.query("SELECT * FROM products WHERE tag = 'New_arrival' ORDER BY id ASC");

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

app.get('/sales', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products WHERE tag = 'Best-seller' ORDER BY id ASC");
        res.render('sales', { products: result.rows });
    } catch (err) {
        console.error("Database Error (Women):", err.message);
        res.status(500).send("Server Error");
    }
});

app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).send("Product not found");
        
        res.render('product-detail', { product: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Add this middleware at the top of app.js
app.use(express.urlencoded({ extended: true }));

// GET Routes to show the pages
app.get('/login', (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await pool.query(
            "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3)",
            [name, email, hashedPassword]
        );
        res.redirect('/login');
    } catch (err) {
        console.error(err.message);
        res.status(500).send("User already exists or database error.");
    }
});

// --- LOGIN ROUTE (With Comparison) ---
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];
            
            // Compare the provided password with the hashed password in the DB
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {

                req.session.user = user;

                res.redirect('/');

            } else {
                res.status(401).send("Incorrect password.");
            }
        } else {
            res.status(404).send("User not found.");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.post("/add-to-cart", async (req, res) => {
    console.log("ADD TO CART HIT");
    console.log(req.body);
    console.log(req.session.user);

    try{

        if(!req.session.user){

            return res.json({
                notLoggedIn: true
            });

        }

        const userId = req.session.user.id;

        const {
            productId,
            size
        } = req.body;

        // CHECK SAME PRODUCT + SAME SIZE
        const existing = await pool.query(

            `
            SELECT * FROM addtocart

            WHERE user_id=$1
            AND product_id=$2
            AND size=$3
            `,

            [userId, productId, size]

        );

        // IF EXISTS
        if(existing.rows.length > 0){

            await pool.query(

                `
                UPDATE addtocart

                SET quantity = quantity + 1

                WHERE user_id=$1
                AND product_id=$2
                AND size=$3
                `,

                [userId, productId, size]

            );

        }else{

            // INSERT
            await pool.query(

                `
                INSERT INTO addtocart
                (user_id, product_id, size)

                VALUES($1,$2,$3)
                `,

                [userId, productId, size]

            );

        }

        res.json({
            success: true
        });

    }catch(err){

        console.log(err);

        res.status(500).json({
            success: false
        });

    }

});

app.get("/cart-items", async (req, res) => {

    try{

        if(!req.session.user){

            return res.json({
                notLoggedIn: true
            });

        }

        const userId = req.session.user.id;

        const result = await pool.query(

            `
            SELECT
                addtocart.id,
                addtocart.quantity,
                addtocart.size,
                products.name,
                products.price,
                products.img_url

            FROM addtocart

            JOIN products
            ON addtocart.product_id = products.id

            WHERE addtocart.user_id = $1
            `,

            [userId]

        );

        res.json(result.rows);

    }catch(err){

        console.log(err);

        res.status(500).json({
            success: false
        });

    }

});

app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/");

    });

});

app.delete("/remove-cart/:id", async (req, res) => {

    try{

        if(!req.session.user){

            return res.json({
                notLoggedIn: true
            });

        }

        const cartId = req.params.id;

        await pool.query(

            `
            DELETE FROM addtocart
            WHERE id = $1
            `,

            [cartId]

        );

        res.json({
            success: true
        });

    }catch(err){

        console.log(err);

        res.status(500).json({
            success: false
        });

    }

});


const PORT = 3000;
app.listen(PORT, () => console.log(`Knotical is running at http://localhost:${PORT}`));