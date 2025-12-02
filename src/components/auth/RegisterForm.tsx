// ============================================
// 27. src/components/auth/RegisterForm.tsx
// ============================================
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AppDispatch, RootState } from '../../store';
import { register as registerAction, clearError } from '../../store/slices/authSlice';
import { ROUTES, ROLES } from '../../utils/constants';
import ErrorMessage from '../common/ErrorMessage';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  company?: string;
}

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: 'onBlur',
    defaultValues: {
      role: ROLES.JOBSEEKER,
    },
  });

  const selectedRole = watch('role');

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === ROLES.JOBSEEKER) {
        navigate(ROUTES.JOBSEEKER_DASHBOARD);
      } else if (user.role === ROLES.RECRUITER) {
        navigate(ROUTES.RECRUITER_DASHBOARD);
      }
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = (data: RegisterFormData) => {
    const submitData = data.role === ROLES.RECRUITER ? data : { ...data, company: undefined };
    dispatch(registerAction(submitData));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              className={`input-field ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`input-field ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className={`input-field ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              I am a
            </label>
            <select
              {...register('role', {
                required: 'Role is required',
              })}
              className={`input-field ${errors.role ? 'border-red-500' : ''}`}
            >
              <option value={ROLES.JOBSEEKER}>Job Seeker</option>
              <option value={ROLES.RECRUITER}>Recruiter</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          {selectedRole === ROLES.RECRUITER && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                {...register('company', {
                  required: selectedRole === ROLES.RECRUITER ? 'Company name is required' : false,
                  minLength: {
                    value: 2,
                    message: 'Company name must be at least 2 characters',
                  },
                })}
                className={`input-field ${errors.company ? 'border-red-500' : ''}`}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
              )}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-primary-600 hover:text-primary-700 font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;