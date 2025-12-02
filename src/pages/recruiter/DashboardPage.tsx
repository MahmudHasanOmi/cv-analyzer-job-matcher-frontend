// ============================================
// 40. src/pages/recruiter/DashboardPage.tsx
// ============================================
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { getMyJobs } from '../../store/slices/jobSlice';
import { getAllCVMatches } from '../../store/slices/matchSlice';
import Loader from '../../components/common/Loader';
import { ROUTES } from '../../utils/constants';

const RecruiterDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myJobs, loading: jobsLoading } = useSelector((state: RootState) => state.job);
  const { candidateMatches, loading: matchesLoading } = useSelector((state: RootState) => state.match);

  useEffect(() => {
    dispatch(getMyJobs());
    dispatch(getAllCVMatches());
  }, [dispatch]);

  if (jobsLoading || matchesLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Recruiter Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-primary-50 border-2 border-primary-200">
          <h3 className="text-lg font-semibold text-primary-900 mb-2">Active Jobs</h3>
          <p className="text-4xl font-bold text-primary-600">{myJobs.length}</p>
        </div>
        <div className="card bg-green-50 border-2 border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Total Candidates</h3>
          <p className="text-4xl font-bold text-green-600">{candidateMatches.length}</p>
        </div>
        <div className="card bg-blue-50 border-2 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Top Match</h3>
          <p className="text-4xl font-bold text-blue-600">
            {candidateMatches.length > 0 ? `${candidateMatches[0]?.bestMatch?.matchPercentage}%` : 'N/A'}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to={ROUTES.POST_JOB} className="btn-primary w-full block text-center">
              Post New Job
            </Link>
            <Link to={ROUTES.MY_JOBS} className="btn-secondary w-full block text-center">
              Manage Jobs
            </Link>
            <Link to={ROUTES.CANDIDATES} className="btn-secondary w-full block text-center">
              View All Candidates
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Top Candidates</h2>
          {candidateMatches.length === 0 ? (
            <p className="text-gray-600">No candidates available yet.</p>
          ) : (
            <div className="space-y-3">
              {candidateMatches.slice(0, 5).map((candidate, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{candidate.userName}</p>
                    <p className="text-sm text-gray-600">{candidate.userEmail}</p>
                  </div>
                  <span className="text-lg font-bold text-primary-600">
                    {candidate?.bestMatch?.matchPercentage}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;