Knotical is a full-stack e-commerce web application that allows users to browse products, manage a shopping cart, and interact with a dynamic backend powered by Node.js and PostgreSQL. It is designed with a clean UI, secure backend APIs, and is deployed for real-world usage.

🚀 Live Demo

🌐 Live App: (https://knotical.onrender.com)

✨ Features 🛒 Product browsing system 🧾 Add to Cart / Remove from Cart functionality 👤 User authentication system (Login / Register) 🔐 Secure session handling 📦 PostgreSQL database integration ⚡ RESTful API backend (Node + Express) 📱 Responsive UI for all devices ☁️ Deployed on Render

🛠 Tech Stack 
Frontend 
    HTML  
    CSS  
    JavaScript (React / EJS / or your actual frontend if used) 
Backend 
    Node.js 
    Express.js 
Database 
    PostgreSQL (Neon / Render DB) 
Other Tools 
    REST APIs Session  
    Cookie Authentication 
    Render Deployment

ScreenShots:
![Home1](./assets/home%20(1).png)
![Home2](./assets/home%20(2).png)
![Home3](./assets/home%20(3).png)
![Home4](./assets/home%20(4).png)


📁 Project Structure 
Knotical/ 
├──  public/
     └── css/style.css
     └── images/
     └── js/main.js
├── views/
    └── partials/cartDrawer.ejs
    └── index.ejs
    └── login.ejs
    └── men.ejs
    └── product-detail.ejs
    └── sales.ejs
    └── signup.ejs
    └── women.ejs
└── app.js
└── db.js
└── README.md

⚙️ Installation & Setup

Clone the repository git clone https://github.com/your-username/knotical.git cd knotical
Setup Backend npm install npm run dev
Setup Frontend cd frontend npm install npm start 🌐 Environment Variables
PORT=3000 DATABASE_URL=your_postgresql_neon_url SESSION_SECRET=your_secret_key

Run Project npm start

🔌 How It Works Users register/login into the system Products are loaded from PostgreSQL database Users can add/remove items from cart Cart updates are stored in database Backend handles all business logic via Express APIs Session system maintains user login state 📱 Responsive Design Fully responsive layout Works on mobile, tablet, and desktop Optimized product grid UI Smooth navigation experience 🚧 Future Improvements

🧠 AI-based product recommendations 💳 Payment gateway integration (Razorpay/Stripe) 📦 Order tracking system 🔍 Advanced search & filters ❤️ Wishlist feature 📊 Admin dashboard

👨‍💻 Author Aarambh Kavlekar Computer Engineering Student

📜 License This project is licensed under the MIT License.
