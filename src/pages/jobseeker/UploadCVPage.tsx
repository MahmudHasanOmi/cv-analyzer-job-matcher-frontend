// ============================================
// 38. src/pages/jobseeker/UploadCVPage.tsx
// ============================================
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { getMyCV, deleteCV } from '../../store/slices/cvSlice';
import CVUpload from '../../components/cv/CVUpload';
import CVDetails from '../../components/cv/CVDetails';
import Loader from '../../components/common/Loader';
import { ROUTES } from '../../utils/constants';

const UploadCVPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cv, loading } = useSelector((state: RootState) => state.cv);

  useEffect(() => {
    dispatch(getMyCV());
  }, [dispatch]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your CV?')) {
      await dispatch(deleteCV());
      dispatch(getMyCV());
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Your CV</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <CVUpload />
        {cv && <CVDetails cv={cv} onDelete={handleDelete} />}
      </div>
    </div>
  );
};

export default UploadCVPage;