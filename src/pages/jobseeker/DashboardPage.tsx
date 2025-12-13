
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { getMyCV } from '../../store/slices/cvSlice';
import { getMyJobMatches } from '../../store/slices/matchSlice';
import CVDetails from '../../components/cv/CVDetails';
import MatchCard from '../../components/match/MatchCard';
import Loader from '../../components/common/Loader';
import { ROUTES } from '../../utils/constants';

const JobSeekerDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cv, loading: cvLoading } = useSelector((state: RootState) => state.cv);
  const { jobMatches, loading: matchLoading } = useSelector((state: RootState) => state.match);

  useEffect(() => {
    dispatch(getMyCV());
  }, [dispatch]);

  useEffect(() => {
    if (cv) {
      dispatch(getMyJobMatches());
    }
  }, [cv, dispatch]);

  if (cvLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Job Seeker Dashboard</h1>

      {!cv ? (
        <div className="card text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold mb-2">No CV Uploaded</h2>
          <p className="text-gray-600 mb-6">
            Upload your CV to start matching with available jobs
          </p>
          <Link to={ROUTES.UPLOAD_CV} className="btn-primary inline-block">
            Upload CV Now
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          <CVDetails cv={cv} />

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Top Job Matches</h2>
              <Link to={ROUTES.JOB_MATCHES} className="text-primary-600 hover:text-primary-700">
                View All →
              </Link>
            </div>

            {matchLoading ? (
              <Loader />
            ) : jobMatches.length === 0 ? (
              <div className="card text-center">
                <p className="text-gray-600">No job matches found. Check back later!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {jobMatches.slice(0, 4).map((job) => (
                  <MatchCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSeekerDashboard;