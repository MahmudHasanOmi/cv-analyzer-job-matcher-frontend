import React from 'react';
import { Job } from '../../store/types';
import { formatDate } from '../../utils/helpers';

interface JobDetailsProps {
  job: Job;
  onEdit?: () => void;
  onDelete?: () => void;
  onApply?: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onEdit, onDelete, onApply }) => {
  return (
    <div className="card">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <p className="text-lg text-gray-600">{job.recruiter.company || job.recruiter.name}</p>
          <p className="text-sm text-gray-500 mt-1">Posted on {formatDate(job.createdAt)}</p>
        </div>
        <div className="flex space-x-2">
          {onEdit && (
            <button onClick={onEdit} className="btn-secondary">
              Edit Job
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete} className="text-red-600 hover:text-red-700 px-4 py-2">
              Delete
            </button>
          )}
          {onApply && (
            <button onClick={onApply} className="btn-primary">
              Apply Now
            </button>
          )}
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Job Description</h2>
        <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
      </div>

      {/* Required Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Required Skills</h2>
        <div className="flex flex-wrap gap-2">
          {job.requiredSkills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-primary-100 text-primary-800 rounded-lg font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Experience Required</h2>
          <p className="text-gray-700 p-4 bg-gray-50 rounded-lg">{job.experience}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Education Required</h2>
          <p className="text-gray-700 p-4 bg-gray-50 rounded-lg">{job.education}</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">About this opportunity</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Job posted by {job.recruiter.name}</li>
          <li>• {job.requiredSkills.length} skills required</li>
          <li>• Posted {formatDate(job.createdAt)}</li>
          {job.updatedAt !== job.createdAt && (
            <li>• Last updated {formatDate(job.updatedAt)}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default JobDetails;