# CV Analyzer & Job Matcher

## Introduction
The **CV Analyzer & Job Matcher** is a web-based application designed to streamline the recruitment process. It bridges the gap between Job Seekers and HR/Recruiters by facilitating CV analysis and automated job matching based on rule-based keyword extraction.

## Features

### 🔹 For Job Seekers
- **Profile Management**: Create and manage your professional profile.
- **CV Upload**: Upload CVs in PDF or DOCX formats.
- **Automated Analysis**: Get instant feedback on extracted skills, education, and experience.
- **Job Matching**: View job postings that match your profile with a compatibility percentage.
- **Skill Gap Analysis**: Identify missing skills required for specific jobs.

### 🔹 For HR / Recruiters
- **Job Posting**: Create detailed job descriptions with required skills and experience.
- **Candidate Matching**: Automatically rank candidates based on their CV's relevance to the job description.
- **Dashboard**: Track job postings and view candidate match statistics.
- **Shortlisting**: Efficiently shortlist and manage potential candidates.

## Technology Stack

- **Frontend**: React, TypeScript, Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Application pages (Job Seeker & Recruiter views)
├── services/       # API services (Auth, CV, Job, Match)
├── store/          # Redux state management
├── utils/          # Helper functions and constants
├── App.tsx         # Main application component & routing
└── main.tsx        # Entry point
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <(https://github.com/MahmudHasanOmi/cv-analyzer-job-matcher-frontend)>
    ```
2.  Navigate to the project directory:
    ```bash
    cd cv-analyzer-frontend
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000` (or the port shown in your terminal).

## Workflow

1.  **Job Seeker** uploads a CV.
2.  **HR** posts a job description.
3.  The system analyzes the text to extract keywords (skills, education, experience).
4.  The **Matching Engine** calculates a score based on matched skills vs. required skills.
5.  Results are displayed to both parties to facilitate informed decision-making.

---
*This project focuses on rule-based matching logic to provide transparent and explainable results, avoiding opaque machine learning models.*
