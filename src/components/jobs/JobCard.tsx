// ============================================
// 32. src/components/jobs/JobCard.tsx
// ============================================
import React from 'react';
import { Job } from '../../store/types';
import { formatDate } from '../../utils/helpers';

interface JobCardProps {
  job: Job;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewCandidates?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete, onViewCandidates }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.recruiter.company}</p>
        </div>
        {(onEdit || onDelete) && (
          <div className="flex space-x-2">
            {onEdit && (
              <button onClick={onEdit} className="text-primary-600 hover:text-primary-700 text-sm">
                Edit
              </button>
            )}
            {onDelete && (
              <button onClick={onDelete} className="text-red-600 hover:text-red-700 text-sm">
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      <p className="text-gray-700 mb-4">{job.description}</p>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600 pt-4 border-t">
          <div className="space-y-1">
            <p>Experience: {job.experience}</p>
            <p>Education: {job.education}</p>
          </div>
          <p>Posted: {formatDate(job.createdAt)}</p>
        </div>

        {onViewCandidates && (
          <button onClick={onViewCandidates} className="btn-primary w-full mt-4">
            View Candidates
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;