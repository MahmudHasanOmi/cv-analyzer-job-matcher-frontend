import React from 'react';
import { getMatchColor } from '../../utils/helpers';

interface MatchStatsProps {
  matchPercentage: number;
  matchedSkillsCount: number;
  missingSkillsCount: number;
  totalSkillsRequired: number;
}

const MatchStats: React.FC<MatchStatsProps> = ({
  matchPercentage,
  matchedSkillsCount,
  missingSkillsCount,
  totalSkillsRequired,
}) => {
  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-4">Match Statistics</h3>
      
      <div className="space-y-4">
        {/* Overall Match Percentage */}
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Overall Match</div>
          <div className={`text-5xl font-bold ${getMatchColor(matchPercentage)}`}>
            {matchPercentage}%
          </div>
        </div>

        {/* Skills Breakdown */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-primary-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-600">{totalSkillsRequired}</div>
            <div className="text-sm text-gray-600">Total Required</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{matchedSkillsCount}</div>
            <div className="text-sm text-gray-600">Matched</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{missingSkillsCount}</div>
            <div className="text-sm text-gray-600">Missing</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Skills Coverage</span>
            <span>{matchPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                matchPercentage >= 80
                  ? 'bg-green-500'
                  : matchPercentage >= 60
                  ? 'bg-blue-500'
                  : matchPercentage >= 40
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${matchPercentage}%` }}
            />
          </div>
        </div>

        {/* Match Quality Indicator */}
        <div className="p-4 rounded-lg border-2 border-gray-200">
          <div className="flex items-center justify-between">
            <span className="font-medium">Match Quality:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                matchPercentage >= 80
                  ? 'bg-green-100 text-green-800'
                  : matchPercentage >= 60
                  ? 'bg-blue-100 text-blue-800'
                  : matchPercentage >= 40
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {matchPercentage >= 80
                ? 'Excellent Match'
                : matchPercentage >= 60
                ? 'Good Match'
                : matchPercentage >= 40
                ? 'Fair Match'
                : 'Low Match'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchStats;