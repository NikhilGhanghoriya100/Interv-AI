# Interv.AI 🤖

> **Your Personal AI Interviewer**

Interv.AI is a full-stack AI-powered mock interview platform designed to help students, freshers, and job seekers practice technical and HR interviews in a realistic environment.

Instead of simply reading interview questions, candidates can create an interview based on their target role and experience level, interact with an AI interviewer through a timed interview session, submit answers using voice/text interaction, and receive structured feedback and performance scores.

The goal of Interv.AI is simple: **make interview practice more realistic, interactive, measurable, and accessible.**

---

## ✨ Key Features

### 🎯 Personalized Interview Setup

- Select the desired job role.
- Select experience level.
- Generate interview sessions based on the selected configuration.
- Practice different technical and HR-style interview scenarios.

### 🤖 AI-Powered Question Generation

- Generates interview questions dynamically.
- Questions are tailored to the selected role and experience level.
- Supports a realistic sequence of interview questions rather than a fixed question list.

### 🎙️ Voice-Based Interview

- Provides an interactive voice interview experience.
- Candidates can answer questions using speech interaction.
- AI interviewer video assets are used to make the experience feel closer to a real interview.

### ⏱️ Timed Interview Simulation

- Each question can have a defined time limit.
- Timer-based sessions create realistic interview pressure.
- Helps candidates improve their ability to structure answers within limited time.

### 📊 AI-Based Evaluation

Interview answers can be evaluated using multiple performance dimensions, including:

- **Correctness**
- **Communication**
- **Confidence**
- **Overall score**
- **Detailed feedback**

This allows candidates to identify both technical and communication-related weaknesses.

### 📄 Resume / PDF Support

- Supports PDF-based resume/information processing.
- Resume information can be used as an additional input for interview preparation.
- Helps move towards more personalized, resume-aware interviews.

### 🔐 Authentication

- User signup and login.
- JWT-based authentication.
- HTTP-only cookie based session handling.
- Protected user functionality.

### 🔥 Google Authentication

- Firebase integration for Google sign-in.
- Provides an alternative authentication flow for users.

### 💳 Premium & Payment System

- Credit/premium based functionality.
- Razorpay integration for payment processing.
- Designed to support premium interview features and usage limits.

### 👤 Dashboard & Profile

- User-specific dashboard.
- Credit information.
- Interview activity.
- Profile/account information.
- Interview performance tracking.

### 📈 Interview History

- Previous interview sessions can be stored.
- Users can review interview results and feedback.
- Creates a foundation for tracking improvement over time.

### 💻 Modern Responsive UI

- React-based frontend.
- Tailwind CSS styling.
- Motion-based animations.
- Responsive layouts.
- Reusable components.
- Progress indicators and interactive interview screens.

---

## 🧠 How Interv.AI Works

The application follows a complete interview workflow:

```text
┌──────────────────────┐
│        User          │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Authentication       │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Role & Experience    │
│ Selection             │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Create Interview     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ AI Question          │
│ Generation            │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Voice / Text         │
│ Interview             │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Timed Answer         │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ AI Evaluation        │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Score + Feedback     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ History & Progress   │
└──────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend UI development |
| Vite | Development server and build tool |
| Tailwind CSS | Styling and responsive UI |
| React Router | Client-side routing |
| Redux Toolkit | Global state management |
| Axios | API communication |
| Firebase | Google authentication |
| Motion | UI animations |
| React Icons | Icons and UI elements |
| Monaco Editor | Code editor functionality |
| React Circular Progressbar | Progress visualization |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API and server framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| Cookie Parser | Cookie handling |
| CORS | Cross-origin communication |
| Multer | File uploads |
| PDF.js | PDF processing |
| Razorpay | Payment integration |
| Axios | External API communication |
| dotenv | Environment configuration |
| Nodemon | Development server restart |

---

## 🏗️ Architecture

Interv.AI follows a separated frontend/backend architecture:

```text
                    ┌───────────────────┐
                    │     React App     │
                    │      Client       │
                    └─────────┬─────────┘
                              │
                         HTTP / API
                              │
                              ↓
                    ┌───────────────────┐
                    │  Express Server   │
                    │      Server       │
                    └─────────┬─────────┘
                              │
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
       ┌────────────┐  ┌────────────┐  ┌────────────┐
       │ Controllers│  │  Services  │  │   Routes   │
       └────────────┘  └────────────┘  └────────────┘
                              │
                              ↓
                    ┌───────────────────┐
                    │      MongoDB      │
                    └───────────────────┘
```

The backend is responsible for authentication, user management, interview operations, payment functionality, database operations, and external AI/service communication.

---

## 📁 Project Structure

```text
Interv.AI/
│
├── client/                         # React + Vite frontend
│   ├── public/                     # Public assets
│   ├── src/
│   │   ├── assets/                 # Images, videos and static assets
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # Application pages
│   │   ├── context/                # React context/state logic
│   │   ├── redux/                  # Redux state management
│   │   ├── services/               # Frontend API/service logic
│   │   ├── App.jsx                 # Main application component
│   │   └── main.jsx                # Frontend entry point
│   ├── .gitignore
│   ├── package.json
│   └── ...
│
├── server/                         # Node.js + Express backend
│   ├── config/                     # Database/configuration
│   ├── controllers/                # API controllers
│   ├── middlewares/                # Authentication and middleware
│   ├── models/                     # MongoDB/Mongoose models
│   ├── routes/                     # API routes
│   ├── services/                   # External/API service logic
│   ├── .gitignore
│   ├── index.js                    # Server entry point
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run Interv.AI locally.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git
- MongoDB / MongoDB Atlas account
- Required API credentials for the services used by your local configuration

### 1. Clone the Repository

```bash
git clone https://github.com/NikhilGhanghoriya100/Interv.AI.git
cd Interv.AI
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server` directory.

Example configuration:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

If Google authentication is enabled, configure the required Firebase values in the frontend according to your Firebase project configuration.

> ⚠️ **Important:** The values above are examples only. Never publish real API keys, database connection strings, JWT secrets, Firebase secrets, or Razorpay credentials in the repository.

### 5. Start the Backend

```bash
cd server
npm run dev
```

The backend runs on port `8000` by default.

### 6. Start the Frontend

In another terminal:

```bash
cd client
npm run dev
```

The Vite development server will provide the local URL, typically:

```text
http://localhost:5173
```

---

## 🔌 API Modules

The backend is organized into four primary API modules:

| Module | Base Route | Purpose |
|---|---|---|
| Authentication | `/api/auth` | Signup, login, logout and authentication operations |
| User | `/api/user` | User profile and account operations |
| Interview | `/api/interview` | Interview creation, questions, answers and results |
| Payment | `/api/payment` | Premium and payment-related operations |

This structure keeps the backend modular and makes it easier to maintain and extend individual features.

---

## 🎤 Interview Experience

A typical interview session works like this:

1. User logs into the application.
2. User selects the target role and experience level.
3. An interview session is created.
4. AI-generated questions are presented to the candidate.
5. The candidate answers using the available interview interaction.
6. A timer controls the response duration.
7. The answer is processed for evaluation.
8. The system generates feedback and performance scores.
9. Results are stored with the interview session.
10. The candidate can review the interview history and identify areas for improvement.

---

## 📊 Evaluation System

Interv.AI is designed to evaluate answers using multiple dimensions rather than relying only on a single score.

### Correctness

Measures how accurately the candidate addresses the question and whether the important technical concepts are covered.

### Communication

Focuses on how clearly and effectively the candidate communicates the answer.

### Confidence

Provides a performance dimension related to the candidate's confidence during the interview interaction.

### Overall Performance

Combines the evaluation into a useful summary that helps candidates understand their interview performance.

---

## 🔐 Security

Interv.AI uses several mechanisms to protect user and application data:

- JWT-based authentication.
- HTTP-only cookies for authentication tokens.
- Environment variables for sensitive configuration.
- CORS configuration for frontend/backend communication.
- Password hashing on the backend.
- Protected API functionality for authenticated users.

**Never commit `.env` files or secrets to GitHub.**

---

## 💳 Premium & Payments

Interv.AI includes a payment architecture using Razorpay for premium functionality.

The system can be extended to support:

- Premium interview credits.
- Paid interview sessions.
- Feature-based access control.
- Credit-based usage.
- Payment verification and transaction history.

---

## 📦 Running in Development

You need two terminals during development:

**Terminal 1 — Backend**

```bash
cd server
npm run dev
```

**Terminal 2 — Frontend**

```bash
cd client
npm run dev
```

The frontend communicates with the backend through the configured API URL.

---

## 🎯 Use Cases

Interv.AI can be useful for:

- 🎓 College students preparing for placements.
- 💼 Freshers preparing for their first technical interview.
- 👨‍💻 Developers preparing for software engineering interviews.
- 🧑‍💼 Candidates preparing for HR interviews.
- 🎤 Candidates who want to practice speaking answers aloud.
- 📄 Candidates who want resume-aware interview preparation.
- 📈 Anyone who wants measurable interview practice and feedback.

---

## 🌟 Why Interv.AI?

Traditional interview preparation usually involves searching for questions, practicing alone, and asking someone else for feedback.

Interv.AI combines these activities into a single interactive platform:

```text
Questions
    +
Realistic Interview Environment
    +
Voice Interaction
    +
Time Pressure
    +
AI Evaluation
    +
Performance Tracking
    ↓
Better Interview Preparation
```

The platform is built around the idea of **practice → feedback → improvement → repeat**.

---

## 🔮 Future Improvements

Some possible future improvements include:

- 🎙️ More natural real-time AI interviewer voice generation.
- 🗣️ Advanced speech and pronunciation analysis.
- 👀 Improved confidence and communication analysis.
- 📊 Detailed interview analytics and performance graphs.
- 📄 More advanced resume-based question generation.
- 🎯 Company-specific interview preparation.
- 🧠 Adaptive difficulty based on previous performance.
- 📝 More technical coding interview capabilities.
- 🔄 CI/CD pipeline and automated testing.
- 📱 Dedicated mobile experience.

---

## 🤝 Contributing

Contributions and suggestions are welcome.

To contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Test your changes locally.
5. Commit your changes.
6. Push the branch.
7. Open a Pull Request.

Please make sure sensitive credentials are not included in commits.

---

## 👨‍💻 Author

### Nikhil Ghanghoriya

B.Tech CSE Student | MERN Stack Developer | Gen AI Enthusiast

GitHub: **[@NikhilGhanghoriya100](https://github.com/NikhilGhanghoriya100)**

---

## ⭐ Support the Project

If you find **Interv.AI** useful or interesting, consider giving the repository a ⭐ on GitHub.

Your support helps the project grow and motivates further development.

---

## 📜 License

This project is currently intended for learning, development, and portfolio purposes.

---

<div align="center">

### Interv.AI 🤖

**Practice smarter. Speak confidently. Interview better. 🚀**


</div>
