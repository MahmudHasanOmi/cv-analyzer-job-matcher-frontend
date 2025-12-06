import React from 'react';
import { JobMatch } from '../../store/types';
import { getMatchColor, getMatchBgColor, formatDate } from '../../utils/helpers';

interface MatchCardProps {
  job: JobMatch;
}

const MatchCard: React.FC<MatchCardProps> = ({ job }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-600">
            {job.recruiter.company || job.recruiter.name}
          </p>
        </div>
        <div className={`px-4 py-2 rounded-lg ${getMatchBgColor(job.matchPercentage)}`}>
          <span className={`text-2xl font-bold ${getMatchColor(job.matchPercentage)}`}>
            {job.matchPercentage}%
          </span>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Required Skills ({job.requiredSkills.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-sm ${
                  job.matchedSkills.includes(skill)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {job.matchedSkills.includes(skill) ? '✓' : '○'} {skill}
              </span>
            ))}
          </div>
        </div>

        {job.matchedSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-green-700 mb-2">
              Your Matching Skills ({job.matchedSkills.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {job.matchedSkills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {job.missingSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-red-700 mb-2">
              Skills to Improve ({job.missingSkills.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {job.missingSkills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                  ✗ {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-4 border-t">
          <div>
            <span className="font-medium">Experience:</span> {job.experience}
          </div>
          <div>
            <span className="font-medium">Education:</span> {job.education}
          </div>
          <div className="ml-auto">
            <span className="font-medium">Posted:</span> {formatDate(job.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;