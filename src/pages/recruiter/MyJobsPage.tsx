import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { getMyJobs, deleteJob, updateJob } from '../../store/slices/jobSlice';
import { getCVMatchesForJob } from '../../store/slices/matchSlice';
import JobCard from '../../components/jobs/JobCard';
import JobForm from '../../components/jobs/JobForm';
import CandidateCard from '../../components/match/CandidateCard';
import Loader from '../../components/common/Loader';
import { Job } from '../../store/types';
import { ROUTES } from '../../utils/constants';

const MyJobsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myJobs, loading } = useSelector((state: RootState) => state.job);
  const { candidateMatches, loading: matchLoading } = useSelector((state: RootState) => state.match);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingCandidates, setViewingCandidates] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      await dispatch(deleteJob(id));
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (data: any) => {
    if (editingJob) {
      const result = await dispatch(updateJob({ id: editingJob.id, data }));
      if (updateJob.fulfilled.match(result)) {
        setEditingJob(null);
      }
    }
  };

  const handleViewCandidates = (jobId: number) => {
    setViewingCandidates(jobId);
    dispatch(getCVMatchesForJob(jobId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loader />;

  // Editing Mode
  if (editingJob) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit Job Posting</h1>
          <button
            onClick={() => setEditingJob(null)}
            className="btn-secondary"
          >
            ← Cancel
          </button>
        </div>
        <div className="card">
          <JobForm
            initialData={editingJob}
            onSubmit={handleUpdate}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  // Viewing Candidates Mode
  if (viewingCandidates) {
    const job = myJobs.find((j) => j.id === viewingCandidates);
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{job?.title}</h1>
            <p className="text-gray-600 mt-2">
              Candidates matched for this position
            </p>
          </div>
          <button
            onClick={() => setViewingCandidates(null)}
            className="btn-secondary"
          >
            ← Back to My Jobs
          </button>
        </div>

        {matchLoading ? (
          <Loader />
        ) : candidateMatches.length === 0 ? (
          <div className="card text-center">
            <div className="text-6xl mb-4">👥</div>
            <h2 className="text-2xl font-bold mb-2">No Candidates Yet</h2>
            <p className="text-gray-600">
              No candidates have uploaded CVs matching this job yet
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <p className="text-green-900">
                <strong>{candidateMatches.length}</strong>{' '}
                {candidateMatches.length === 1 ? 'candidate' : 'candidates'} found.
                Sorted by match percentage.
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
  }

  // Main View - List of Jobs
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Job Postings</h1>
        <Link to={ROUTES.POST_JOB} className="btn-primary">
          + Post New Job
        </Link>
      </div>

      {myJobs.length === 0 ? (
        <div className="card text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold mb-2">No Jobs Posted Yet</h2>
          <p className="text-gray-600 mb-6">
            Start by posting your first job opening to find great candidates
          </p>
          <Link to={ROUTES.POST_JOB} className="btn-primary inline-block">
            Post Your First Job
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-900">
              You have <strong>{myJobs.length}</strong> active{' '}
              {myJobs.length === 1 ? 'job posting' : 'job postings'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {myJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={() => handleEdit(job)}
                onDelete={() => handleDelete(job.id)}
                onViewCandidates={() => handleViewCandidates(job.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyJobsPage;