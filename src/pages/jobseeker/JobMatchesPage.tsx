// ============================================
// 39. src/pages/jobseeker/JobMatchesPage.tsx
// ============================================
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getMyJobMatches } from '../../store/slices/matchSlice';
import MatchCard from '../../components/match/MatchCard';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';

const JobMatchesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobMatches, loading, error } = useSelector((state: RootState) => state.match);

  useEffect(() => {
    dispatch(getMyJobMatches());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Job Matches</h1>

      {error && <ErrorMessage message={error} />}

      {jobMatches.length === 0 ? (
        <div className="card text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">No Jobs Available</h2>
          <p className="text-gray-600">
            There are no job postings at the moment. Check back later!
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-900">
              <strong>{jobMatches.length}</strong> jobs found. Sorted by best match.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {jobMatches.map((job) => (
              <MatchCard key={job.id} job={job} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default JobMatchesPage;