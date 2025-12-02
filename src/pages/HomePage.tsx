// ============================================
// 34. src/pages/HomePage.tsx
// ============================================
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ROUTES, ROLES } from '../utils/constants';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="text-center">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          CV Analyzer & Job Matcher
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Match your skills with the perfect job or find the ideal candidate for your company
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        <div className="card">
          <div className="text-4xl mb-4">💼</div>
          <h2 className="text-2xl font-bold mb-3">For Job Seekers</h2>
          <ul className="text-left space-y-2 mb-6">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Upload your CV and get instant analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>See match percentages with available jobs</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Get insights on missing skills</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Find jobs that match your profile</span>
            </li>
          </ul>
          {!isAuthenticated && (
            <Link to={ROUTES.REGISTER} className="btn-primary w-full inline-block">
              Get Started
            </Link>
          )}
        </div>

        <div className="card">
          <div className="text-4xl mb-4">🏢</div>
          <h2 className="text-2xl font-bold mb-3">For Recruiters</h2>
          <ul className="text-left space-y-2 mb-6">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Post job openings with required skills</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>View ranked candidates by match percentage</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Access detailed candidate profiles</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Manage all your job postings</span>
            </li>
          </ul>
          {!isAuthenticated && (
            <Link to={ROUTES.REGISTER} className="btn-primary w-full inline-block">
              Post a Job
            </Link>
          )}
        </div>
      </div>

      {isAuthenticated && (
        <div className="card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Welcome back, {user?.name}!</h2>
          <p className="text-gray-600 mb-6">
            {user?.role === ROLES.JOBSEEKER
              ? 'Ready to find your next opportunity?'
              : 'Ready to find your next hire?'}
          </p>
          <Link
            to={
              user?.role === ROLES.JOBSEEKER
                ? ROUTES.JOBSEEKER_DASHBOARD
                : ROUTES.RECRUITER_DASHBOARD
            }
            className="btn-primary inline-block"
          >
            Go to Dashboard
          </Link>
        </div>
      )}

      <div className="mt-16 p-8 bg-gray-100 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">1</div>
            <h3 className="font-semibold mb-2">Upload or Post</h3>
            <p className="text-sm text-gray-600">
              Job seekers upload CVs, recruiters post job openings
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">2</div>
            <h3 className="font-semibold mb-2">AI Analysis</h3>
            <p className="text-sm text-gray-600">
              Our system automatically extracts and matches skills
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">3</div>
            <h3 className="font-semibold mb-2">Find Matches</h3>
            <p className="text-sm text-gray-600">
              Get ranked results with detailed match percentages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;