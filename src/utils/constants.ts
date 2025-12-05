export const API_BASE_URL = 'http://localhost:5000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Job Seeker Routes
  JOBSEEKER_DASHBOARD: '/jobseeker/dashboard',
  UPLOAD_CV: '/jobseeker/upload-cv',
  JOB_MATCHES: '/jobseeker/job-matches',
  
  // Recruiter Routes
  RECRUITER_DASHBOARD: '/recruiter/dashboard',
  POST_JOB: '/recruiter/post-job',
  MY_JOBS: '/recruiter/my-jobs',
  CANDIDATES: '/recruiter/candidates',
  EDIT_JOB: '/recruiter/edit-job/:id',
};

export const ROLES = {
  JOBSEEKER: 'jobseeker',
  RECRUITER: 'recruiter',
};
