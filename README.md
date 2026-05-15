
Knotical is a full-stack e-commerce web application that allows users to browse products, manage a shopping cart, and interact with a dynamic backend powered by Node.js and PostgreSQL. It is designed with a clean UI, secure backend APIs, and is deployed for real-world usage.

🚀 Live Demo

🌐 Live App: (https://knotical.onrender.com)



✨ Features
🛒 Product browsing system
🧾 Add to Cart / Remove from Cart functionality
👤 User authentication system (Login / Register)
🔐 Secure session handling
📦 PostgreSQL database integration
⚡ RESTful API backend (Node + Express)
📱 Responsive UI for all devices
☁️ Deployed on Render



🛠 Tech Stack
Frontend
HTML / CSS / JavaScript
(React / EJS / or your actual frontend if used)
Backend
Node.js
Express.js
Database
PostgreSQL (Neon / Render DB)
Other Tools
REST APIs
Session / Cookie Authentication
Render Deployment




ScreenShots:
<img width="1440" height="852" alt="image" src="https://github.com/user-attachments/assets/86b03208-dc98-4006-b0e2-7279f68a412f" />




📁 Project Structure
meeto/
│
├── frontend/          # React frontend
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
│
├── backend/           # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── socket/
│   └── models/
│
└── README.md

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/knotical.git
cd knotical
2. Setup Backend
npm install
npm run dev
3. Setup Frontend
cd frontend
npm install
npm start
🌐 Environment Variables

PORT=3000
DATABASE_URL=your_postgresql_neon_url
SESSION_SECRET=your_secret_key

Run Project
npm start


🔌 How It Works
Users register/login into the system
Products are loaded from PostgreSQL database
Users can add/remove items from cart
Cart updates are stored in database
Backend handles all business logic via Express APIs
Session system maintains user login state
📱 Responsive Design
Fully responsive layout
Works on mobile, tablet, and desktop
Optimized product grid UI
Smooth navigation experience
🚧 Future Improvements

🧠 AI-based product recommendations
💳 Payment gateway integration (Razorpay/Stripe)
📦 Order tracking system
🔍 Advanced search & filters
❤️ Wishlist feature
📊 Admin dashboard

👨‍💻 Author
Aarambh Kavlekar
Computer Engineering Student

📜 License
This project is licensed under the MIT License.
