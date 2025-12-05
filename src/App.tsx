// ============================================
// 44. src/App.tsx
// ============================================
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobSeekerDashboard from './pages/jobseeker/DashboardPage';
import UploadCVPage from './pages/jobseeker/UploadCVPage';
import JobMatchesPage from './pages/jobseeker/JobMatchesPage';
import RecruiterDashboard from './pages/recruiter/DashboardPage';
import PostJobPage from './pages/recruiter/PostJobPage';
import MyJobsPage from './pages/recruiter/MyJobsPage';
import CandidatesPage from './pages/recruiter/CandidatesPage';
import { ROUTES, ROLES } from './utils/constants';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

          {/* Job Seeker Routes */}
          <Route
            path={ROUTES.JOBSEEKER_DASHBOARD}
            element={
              <ProtectedRoute allowedRoles={[ROLES.JOBSEEKER]}>
                <JobSeekerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.UPLOAD_CV}
            element={
              <ProtectedRoute allowedRoles={[ROLES.JOBSEEKER]}>
                <UploadCVPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.JOB_MATCHES}
            element={
              <ProtectedRoute allowedRoles={[ROLES.JOBSEEKER]}>
                <JobMatchesPage />
              </ProtectedRoute>
            }
          />

          {/* Recruiter Routes */}
          <Route
            path={ROUTES.RECRUITER_DASHBOARD}
            element={
              <ProtectedRoute allowedRoles={[ROLES.RECRUITER]}>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.POST_JOB}
            element={
              <ProtectedRoute allowedRoles={[ROLES.RECRUITER]}>
                <PostJobPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.MY_JOBS}
            element={
              <ProtectedRoute allowedRoles={[ROLES.RECRUITER]}>
                <MyJobsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CANDIDATES}
            element={
              <ProtectedRoute allowedRoles={[ROLES.RECRUITER]}>
                <CandidatesPage />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
