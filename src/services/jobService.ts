import api from './api';
import { Job } from '../store/types';

interface CreateJobData {
  title: string;
  description: string;
  requiredSkills: string[];
  experience: string;
  education: string;
}

export const jobService = {
  createJob: async (data: CreateJobData): Promise<{ job: Job; message: string }> => {
    const response = await api.post('/jobs', data);
    return response.data;
  },

  updateJob: async (id: number, data: Partial<CreateJobData>): Promise<{ job: Job; message: string }> => {
    const response = await api.put(`/jobs/${id}`, data);
    return response.data;
  },

  deleteJob: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  getJob: async (id: number): Promise<Job> => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  getAllJobs: async (): Promise<Job[]> => {
    const response = await api.get('/jobs');
    return response.data;
  },

  getMyJobs: async (): Promise<Job[]> => {
    const response = await api.get('/jobs/recruiter/my-jobs');
    return response.data;
  },
};
