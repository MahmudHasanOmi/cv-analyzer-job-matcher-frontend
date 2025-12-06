// ============================================
// 33. src/components/jobs/JobForm.tsx
// ============================================
import React, { useState, useEffect } from 'react';
import { Job } from '../../store/types';

interface JobFormProps {
  initialData?: Job;
  onSubmit: (data: any) => void;
  loading: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    requiredSkills: initialData?.requiredSkills.join(', ') || '',
    experience: initialData?.experience || '',
    education: initialData?.education || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()).filter(s => s),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className="input-field"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Required Skills (comma-separated) *
        </label>
        <input
          type="text"
          name="requiredSkills"
          value={formData.requiredSkills}
          onChange={handleChange}
          placeholder="React, Node.js, TypeScript, PostgreSQL"
          className="input-field"
          required
        />
        <p className="text-sm text-gray-500 mt-1">Separate skills with commas</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Experience Required *
        </label>
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="e.g., 3-5 years"
          className="input-field"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Education Required *
        </label>
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="e.g., Bachelor's degree in Computer Science"
          className="input-field"
          required
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Saving...' : initialData ? 'Update Job' : 'Post Job'}
      </button>
    </form>
  );
};

export default JobForm;