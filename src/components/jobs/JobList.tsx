import React from 'react';
import { Job } from '../../store/types';
import JobCard from './JobCard';

interface JobListProps {
  jobs: Job[];
  onEdit?: (job: Job) => void;
  onDelete?: (id: number) => void;
  onViewCandidates?: (jobId: number) => void;
  onViewDetails?: (job: Job) => void;
  emptyMessage?: string;
}

const JobList: React.FC<JobListProps> = ({
  jobs,
  onEdit,
  onDelete,
  onViewCandidates,
  onViewDetails,
  emptyMessage = 'No jobs available',
}) => {
  if (jobs.length === 0) {
    return (
      <div className="card text-center">
        <div className="text-6xl mb-4">📋</div>
        <h2 className="text-2xl font-bold mb-2">{emptyMessage}</h2>
        <p className="text-gray-600">Check back later for new opportunities</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-900">
          <strong>{jobs.length}</strong> {jobs.length === 1 ? 'job' : 'jobs'} found
        </p>
      </div>

      {/* Job Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={onEdit ? () => onEdit(job) : undefined}
            onDelete={onDelete ? () => onDelete(job.id) : undefined}
            onViewCandidates={onViewCandidates ? () => onViewCandidates(job.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;