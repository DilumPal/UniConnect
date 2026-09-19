# UniConnect: The All-in-One University Ecosystem

**UniConnect** is a comprehensive, AI-powered platform designed to bridge the gap between university students, academic researchers, and industry companies. Built with a robust **Spring Boot (Java)** backend and a stunning, responsive **Next.js (React) & Tailwind CSS** frontend, UniConnect creates a unified ecosystem for career development and academic collaboration.

## ✨ Key Features
- **Role-Based Workflows:** Distinct, secure dashboards tailored for Students, Companies, and Researchers.
- **Jobs & Internship Board:** Companies can easily post new job openings, while students can browse and apply to them directly on the platform.
- **Academic Research Hub:** Researchers can publish ongoing projects, and students can explore these opportunities to get involved in cutting-edge university research.
- **AI-Powered Integrations:**
  - *AI Matchmaker:* Analyzes a student's profile to intelligently recommend the best-fitting jobs and internships.
  - *Smart Cover Letters:* Auto-generates tailored, professional cover letters for students with a single click during the application process.
  - *Research Summarizer (TL;DR):* Uses AI to break down complex, dense academic abstracts into plain English for easier understanding.
- **Modern UI/UX:** A visually striking frontend featuring a sleek "Glassmorphism" design system, ensuring a premium user experience.
- **Secure Architecture:** Built on PostgreSQL with robust JWT-based stateless authentication and Spring Security.

## 🚀 Tech Stack
- **Frontend:** Next.js 15, React, Tailwind CSS (Glassmorphism design)
- **Backend:** Spring Boot 3, Java 21, Spring Security (JWT), Spring Data JPA
- **Database:** PostgreSQL (Containerized via Docker)
- **AI Integration:** Google Gemini API

## 🛠️ How to Run Locally

### 1. Prerequisites
- Java 21
- Node.js 18+
- Docker Desktop (for PostgreSQL database)

### 2. Setup the Database
1. Navigate to the root directory.
2. Run `docker-compose up -d` to start the PostgreSQL container on port `5433`.

### 3. Run the Backend
1. Navigate to the `backend` folder: `cd backend`
2. Create a `.env` file in the `backend` folder and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
3. Start the Spring Boot application:
   ```bash
   ./mvnw clean spring-boot:run
   ```

### 4. Run the Frontend
1. Open a new terminal and navigate to the `frontend` folder: `cd frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:3000`.

---
*Developed as a modern, AI-enhanced platform for academic and career excellence.*
