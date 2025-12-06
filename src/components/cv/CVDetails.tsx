// ============================================
// 29. src/components/cv/CVDetails.tsx
// ============================================
import React from 'react';
import { CV } from '../../store/types';
import { formatDate } from '../../utils/helpers';

interface CVDetailsProps {
  cv: CV;
  onDelete?: () => void;
}

const CVDetails: React.FC<CVDetailsProps> = ({ cv, onDelete }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold">CV Details</h2>
        {onDelete && (
          <button onClick={onDelete} className="text-red-600 hover:text-red-700">
            Delete CV
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">File Name</h3>
          <p className="text-gray-900">{cv.fileName}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Uploaded On</h3>
          <p className="text-gray-900">{formatDate(cv.createdAt)}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Extracted Skills</h3>
          <div className="flex flex-wrap gap-2">
            {cv.extractedSkills.length > 0 ? (
              cv.extractedSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No skills extracted</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Education</h3>
          <p className="text-gray-900">{cv.education}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Experience</h3>
          <p className="text-gray-900">{cv.experience}</p>
        </div>
      </div>
    </div>
  );
};

export default CVDetails;
