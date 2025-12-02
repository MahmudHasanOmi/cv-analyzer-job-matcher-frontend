// ============================================
// 41. src/pages/recruiter/PostJobPage.tsx
// ============================================
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { createJob } from '../../store/slices/jobSlice';
import JobForm from '../../components/jobs/JobForm';
import { ROUTES } from '../../utils/constants';
import ErrorMessage from '../../components/common/ErrorMessage';

const PostJobPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.job);

  const handleSubmit = async (data: any) => {
    const result = await dispatch(createJob(data));
    if (createJob.fulfilled.match(result)) {
      navigate(ROUTES.MY_JOBS);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>

      <div className="card">
        {error && <ErrorMessage message={error} />}
        <JobForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default PostJobPage;