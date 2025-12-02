import React from 'react';
import { CandidateMatch } from '../../store/types';
import { getMatchColor, getMatchBgColor } from '../../utils/helpers';

interface CandidateCardProps {
  candidate: CandidateMatch;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  console.log(candidate);
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{candidate.userName}</h3>
          <p className="text-sm text-gray-600">{candidate.userEmail}</p>
        </div>
        <div className={`px-4 py-2 rounded-lg ${getMatchBgColor(candidate?.bestMatch?.matchPercentage)}`}>
          <span className={`text-2xl font-bold ${getMatchColor(candidate?.bestMatch?.matchPercentage)}`}>
            {candidate?.bestMatch?.matchPercentage}%
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Candidate Skills</h4>
          <div className="flex flex-wrap gap-2">
            {candidate.extractedSkills.length > 0 ? (
              candidate.extractedSkills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    candidate?.matchedSkills?.includes(skill)
                      ? 'bg-green-100 text-green-800 font-medium'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {candidate?.matchedSkills?.includes(skill) && '✓ '}
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No skills extracted</span>
            )}
          </div>
        </div>

        {candidate?.matchedSkills?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Matched Skills</h4>
            <div className="flex flex-wrap gap-2">
              {candidate?.matchedSkills?.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {candidate?.missingSkills?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Missing Skills</h4>
            <div className="flex flex-wrap gap-2">
              {candidate?.missingSkills?.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                  ✗ {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <span className="text-sm text-gray-600 block mb-1">Education:</span>
            <p className="text-sm font-medium text-gray-900">{candidate?.education}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-1">Experience:</span>
            <p className="text-sm font-medium text-gray-900">{candidate?.experience}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;