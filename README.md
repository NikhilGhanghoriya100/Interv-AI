# Interv.AI 🤖

> **Your Personal AI Interviewer**

Interv.AI is a full-stack AI-powered mock interview platform designed to help students, freshers, and job seekers practice technical and HR interviews in a realistic environment.

Instead of simply reading interview questions, candidates can create an interview based on their target role and experience level, interact with an AI interviewer through a timed interview session, submit answers using voice/text interaction, and receive structured feedback and performance scores.

The goal of Interv.AI is simple: **make interview practice more realistic, interactive, measurable, and accessible.**

---

## ✨ Key Features

### 🎯 Personalized Interview Setup

* Select the desired job role.
* Select experience level.
* Generate interview sessions based on the selected configuration.
* Practice technical and HR-style interview scenarios.

### 🤖 AI-Powered Question Generation

* Dynamically generates interview questions.
* Questions are tailored to role and experience level.
* Supports realistic interview question sequences.

### 🎙️ Voice-Based Interview

* Interactive voice interview experience.
* Candidates can answer using speech interaction.
* AI interviewer video assets make sessions more immersive.

### ⏱️ Timed Interview Simulation

* Questions can have defined time limits.
* Creates realistic interview pressure.
* Helps candidates improve structured answers under time constraints.

### 📊 AI-Based Evaluation

Answers can be evaluated across:

* **Correctness**
* **Communication**
* **Confidence**
* **Overall Score**
* **Detailed Feedback**

### 📄 Resume / PDF Support

* PDF-based resume/information processing.
* Resume information can be used for personalized interview preparation.

### 🔐 Authentication

* User signup and login.
* JWT-based authentication.
* HTTP-only cookie-based session handling.
* Protected user functionality.

### 🔥 Google Authentication

* Firebase integration for Google sign-in.
* Provides an alternative authentication flow.

### 💳 Premium & Payments

* Credit/premium-based functionality.
* Razorpay integration for payment processing.
* Supports premium/credit-based application functionality.

### 👤 Dashboard, Profile & History

* User-specific dashboard.
* Profile/account information.
* Credit and interview activity.
* Previous interview sessions.
* Interview performance tracking.

### 💻 Modern Responsive UI

* React + Vite frontend.
* Tailwind CSS styling.
* Motion-based animations.
* Reusable components.
* Interactive interview screens.
* Progress indicators.
* Monaco Editor support for coding-oriented functionality.

---

## 🧠 How Interv.AI Works

```text
User
  ↓
Authentication
  ↓
Role + Experience Selection
  ↓
Create Interview
  ↓
AI Question Generation
  ↓
Voice / Text Interview
  ↓
Timed Answers
  ↓
AI Evaluation
  ↓
Score + Feedback
  ↓
History & Progress
```

---

## 🏗️ Architecture

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
                 ┌────────────┴────────────┐
                 ↓                         ↓
        ┌───────────────────┐    ┌───────────────────┐
        │      MongoDB      │    │    OpenRouter     │
        │     Database      │    │    AI Service     │
        └───────────────────┘    └───────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Technology                 | Purpose                           |
| -------------------------- | --------------------------------- |
| React 19                   | UI development                    |
| Vite                       | Build tool and development server |
| Tailwind CSS               | Styling and responsive UI         |
| React Router               | Client-side routing               |
| Redux Toolkit              | Global state management           |
| Axios                      | API communication                 |
| Firebase                   | Google authentication             |
| Motion                     | UI animations                     |
| React Icons                | Icons                             |
| Monaco Editor              | Code editor                       |
| React Circular Progressbar | Progress visualization            |

### Backend

| Technology    | Purpose                    |
| ------------- | -------------------------- |
| Node.js       | JavaScript runtime         |
| Express 5     | REST API server            |
| MongoDB       | Database                   |
| Mongoose      | MongoDB ODM                |
| JWT           | Authentication             |
| Cookie Parser | Cookie handling            |
| CORS          | Cross-origin communication |
| Multer        | File uploads               |
| PDF.js        | PDF processing             |
| OpenRouter    | AI model API integration   |
| Razorpay      | Payment integration        |
| Axios         | External API communication |
| dotenv        | Environment configuration  |
| Nodemon       | Development server         |

---

## 📁 Project Structure

```text
Interv-AI/
│
├── client/                              # React + Vite frontend
│   ├── public/                          # Public/static assets
│   ├── src/
│   │   ├── assets/                      # Images, videos and static assets
│   │   │   └── videos/
│   │   │       ├── female-ai.mp4
│   │   │       └── male-ai.mp4
│   │   │
│   │   ├── components/                  # Reusable UI components
│   │   │   ├── AuthModel.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Step1SetUp.jsx
│   │   │   ├── Step2Interview.jsx
│   │   │   ├── Step3Report.jsx
│   │   │   └── Timer.jsx
│   │   │
│   │   ├── pages/                       # Application pages
│   │   │   ├── Auth.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── History.jsx
│   │   │   ├── InterviewPage.jsx
│   │   │   ├── InterviewReport.jsx
│   │   │   └── Pricing.jsx
│   │   │
│   │   ├── redux/                       # Redux state management
│   │   ├── utils/                       # Frontend utilities
│   │   ├── App.jsx                      # Main application component
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx                     # Frontend entry point
│   │
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── server/                              # Node.js + Express backend
│   ├── config/                          # Database/configuration
│   ├── controllers/                     # API controllers
│   │   ├── auth.controller.js
│   │   ├── interview.controller.js
│   │   ├── payment.controller.js
│   │   └── user.contoller.js
│   │
│   ├── middlewares/                     # Authentication/middleware
│   ├── models/                          # Mongoose models
│   ├── routes/                          # API route definitions
│   │   ├── auth.route.js
│   │   ├── interview.route.js
│   │   ├── payment.route.js
│   │   └── user.route.js
│   │
│   ├── services/                        # External service integrations
│   │   └── openRouter.service.js
│   │
│   ├── public/                          # Backend public resources
│   ├── index.js                         # Server entry point
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

## 🔌 API Modules

| Module         | Base Route       | Purpose                                            |
| -------------- | ---------------- | -------------------------------------------------- |
| Authentication | `/api/auth`      | Signup, login, logout and authentication           |
| User           | `/api/user`      | User/profile/account operations                    |
| Interview      | `/api/interview` | Interview creation, questions, answers and results |
| Payment        | `/api/payment`   | Premium and payment-related operations             |

---

## 🤖 AI Integration

Interv.AI uses **OpenRouter** for AI-powered interview functionality.

The AI integration is handled through the backend service layer:

```text
server/
└── services/
    └── openRouter.service.js
```

The AI layer is responsible for functionality such as:

* Interview question generation
* Answer evaluation
* Feedback generation
* Interview personalization
* Resume-aware interview preparation

The API configuration should be stored using environment variables.

```env
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=your_model
```

> ⚠️ **Never commit real API keys to GitHub.**

---

## 🎤 Interview Flow

A typical interview session follows these steps:

1. User logs into the application.
2. User selects the target role and experience level.
3. An interview session is created.
4. AI-generated questions are presented.
5. Candidate answers using voice/text interaction.
6. Timer controls the response duration.
7. Answers are processed for evaluation.
8. AI generates scores and feedback.
9. Interview report is displayed.
10. Interview results can be reviewed through history.

---

## 📊 Evaluation System

Interv.AI is designed to evaluate answers across multiple dimensions.

### Correctness

Measures how accurately the candidate answers the question and covers relevant concepts.

### Communication

Evaluates how clearly and effectively the candidate communicates the answer.

### Confidence

Provides a performance dimension related to confidence during the interview interaction.

### Overall Performance

Combines the evaluation into a summarized performance result.

---

## 🔐 Security

Interv.AI uses several mechanisms for application security:

* JWT-based authentication
* HTTP-only authentication cookies
* Password hashing
* Firebase Google authentication
* CORS configuration
* Environment variables for sensitive credentials
* Protected API functionality

### Never Commit Secrets

Never commit the following to GitHub:

```text
.env
API Keys
MongoDB connection strings
JWT secrets
Razorpay secrets
Private Firebase credentials
```

---

## 💳 Premium & Payments

Interv.AI includes Razorpay integration for premium and credit-based functionality.

The payment architecture can support:

* Interview credits
* Premium plans
* Paid interview sessions
* Usage-based access
* Payment verification

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm
* Git
* MongoDB / MongoDB Atlas
* Firebase project if Google authentication is enabled
* OpenRouter API key
* Razorpay credentials if payment functionality is enabled

### 1. Clone the Repository

```bash
git clone https://github.com/NikhilGhanghoriya100/Interv-AI.git
cd Interv-AI
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

Create the required `.env` files locally.

Example backend configuration:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=your_model

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Configure the required Firebase frontend environment variables according to your Firebase project.

> **Important:** These values are placeholders. Never publish real credentials in the repository.

### 5. Start the Backend

```bash
cd server
npm run dev
```

Backend:

```text
http://localhost:8000
```

### 6. Start the Frontend

In another terminal:

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🧪 Development Commands

### Frontend

```bash
cd client

npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```bash
cd server

npm run dev
```

---

## 🎯 Use Cases

Interv.AI is useful for:

* 🎓 College students preparing for placements
* 💼 Freshers preparing for interviews
* 👨‍💻 Developers preparing for technical interviews
* 🧑‍💼 Candidates preparing for HR interviews
* 🎤 Candidates practicing spoken answers
* 📄 Candidates looking for resume-aware preparation
* 📈 Anyone wanting measurable interview practice

---

## 🌟 Why Interv.AI?

Traditional interview preparation usually involves:

```text
Search Questions
      ↓
Practice Alone
      ↓
Find Someone for Mock Interview
      ↓
Get Feedback
```

Interv.AI combines these steps into one platform:

```text
AI Questions
     +
Realistic Interview
     +
Voice / Text Interaction
     +
Time Pressure
     +
AI Evaluation
     +
Performance Tracking
     ↓
Better Interview Preparation
```

The core idea is:

**Practice → Feedback → Improve → Repeat**

---

## 🔮 Future Improvements

Some planned/possible improvements include:

* 🎙️ More natural real-time AI voice interaction
* 🗣️ Advanced speech and pronunciation analysis
* 📊 Detailed interview analytics
* 📈 Performance graphs and trends
* 📄 Advanced resume-based question generation
* 🎯 Company-specific interview preparation
* 🧠 Adaptive interview difficulty
* 💻 Expanded coding interview workflows
* 🧪 Automated testing
* 🔄 CI/CD pipeline
* 📱 Dedicated mobile experience

---

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test locally.
5. Commit your changes.
6. Push your branch.
7. Open a Pull Request.

Please make sure sensitive credentials are never included in commits.

---

## 👨‍💻 Author

### Nikhil Ghanghoriya

**B.Tech CSE Student | MERN Stack Developer | Gen AI Enthusiast**

GitHub: [@NikhilGhanghoriya100](https://github.com/NikhilGhanghoriya100)

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
