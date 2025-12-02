// ============================================
// 43. src/pages/recruiter/CandidatesPage.tsx
// ============================================
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getAllCVMatches } from '../../store/slices/matchSlice';
import CandidateCard from '../../components/match/CandidateCard';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';

const CandidatesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { candidateMatches, loading, error } = useSelector((state: RootState) => state.match);

  useEffect(() => {
    dispatch(getAllCVMatches());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">All Candidates</h1>

      {error && <ErrorMessage message={error} />}

      {candidateMatches.length === 0 ? (
        <div className="card text-center">
          <div className="text-6xl mb-4">👥</div>
          <h2 className="text-2xl font-bold mb-2">No Candidates Yet</h2>
          <p className="text-gray-600">
            Candidates will appear here once they upload their CVs
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-900">
              <strong>{candidateMatches.length}</strong> candidates found. Sorted by best match with your jobs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {candidateMatches.map((candidate) => (
              <CandidateCard key={candidate.cvId} candidate={candidate} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CandidatesPage;