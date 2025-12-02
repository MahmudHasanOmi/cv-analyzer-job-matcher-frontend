// ============================================
// 28. src/components/cv/CVUpload.tsx
// ============================================
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { uploadCV } from '../../store/slices/cvSlice';
import ErrorMessage from '../common/ErrorMessage';

const CVUpload: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.cv);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      await dispatch(uploadCV(file));
      setFile(null);
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Upload Your CV</h2>
      
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="cv-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <label htmlFor="cv-upload" className="cursor-pointer">
            <div className="space-y-2">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-gray-600">
                <span className="text-primary-600 font-medium">Click to upload</span> or drag and drop
              </div>
              <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
            </div>
          </label>

          {file && (
            <div className="mt-4 text-sm text-gray-700">
              Selected: <span className="font-medium">{file.name}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!file || loading}
          className="btn-primary w-full"
        >
          {loading ? 'Uploading...' : 'Upload CV'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">What happens after upload?</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ Your CV will be automatically analyzed</li>
          <li>✓ Skills, education, and experience will be extracted</li>
          <li>✓ You'll see match percentages with available jobs</li>
          <li>✓ Get suggestions for missing skills</li>
        </ul>
      </div>
    </div>
  );
};

export default CVUpload;