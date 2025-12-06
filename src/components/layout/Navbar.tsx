// ============================================
// 23. src/components/layout/Navbar.tsx
// ============================================
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { ROUTES, ROLES } from '../../utils/constants';

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={ROUTES.HOME} className="text-2xl font-bold text-primary-600">
              CV Analyzer
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">
                  Welcome, <span className="font-semibold">{user?.name}</span>
                </span>
                
                {user?.role === ROLES.JOBSEEKER && (
                  <>
                    <Link to={ROUTES.JOBSEEKER_DASHBOARD} className="text-gray-700 hover:text-primary-600">
                      Dashboard
                    </Link>
                    <Link to={ROUTES.UPLOAD_CV} className="text-gray-700 hover:text-primary-600">
                      Upload CV
                    </Link>
                    <Link to={ROUTES.JOB_MATCHES} className="text-gray-700 hover:text-primary-600">
                      Job Matches
                    </Link>
                  </>
                )}

                {user?.role === ROLES.RECRUITER && (
                  <>
                    <Link to={ROUTES.RECRUITER_DASHBOARD} className="text-gray-700 hover:text-primary-600">
                      Dashboard
                    </Link>
                    <Link to={ROUTES.POST_JOB} className="text-gray-700 hover:text-primary-600">
                      Post Job
                    </Link>
                    <Link to={ROUTES.MY_JOBS} className="text-gray-700 hover:text-primary-600">
                      My Jobs
                    </Link>
                    <Link to={ROUTES.CANDIDATES} className="text-gray-700 hover:text-primary-600">
                      Candidates
                    </Link>
                  </>
                )}

                <button onClick={handleLogout} className="btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} className="text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link to={ROUTES.REGISTER} className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;