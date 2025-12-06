import React from 'react';
import { CV } from '../../store/types';
import { formatDate } from '../../utils/helpers';

interface CVListProps {
  cvs: CV[];
  onViewDetails?: (cv: CV) => void;
}

const CVList: React.FC<CVListProps> = ({ cvs, onViewDetails }) => {
  if (cvs.length === 0) {
    return (
      <div className="card text-center">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold mb-2">No CVs Found</h2>
        <p className="text-gray-600">No candidates have uploaded their CVs yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-900">
          <strong>{cvs.length}</strong> {cvs.length === 1 ? 'CV' : 'CVs'} found
        </p>
      </div>

      {/* CV Cards */}
      <div className="grid gap-4">
        {cvs.map((cv) => (
          <div key={cv.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {cv.user?.name || 'Unknown User'}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{cv.user?.email}</p>

                {/* Skills Preview */}
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {cv.extractedSkills.slice(0, 6).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {cv.extractedSkills.length > 6 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                        +{cv.extractedSkills.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Education:</span>
                    <p className="font-medium text-gray-900">{cv.education}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Experience:</span>
                    <p className="font-medium text-gray-900">{cv.experience}</p>
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-500">
                  Uploaded: {formatDate(cv.createdAt)}
                </div>
              </div>

              {onViewDetails && (
                <button
                  onClick={() => onViewDetails(cv)}
                  className="btn-secondary ml-4"
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVList;