import api from './api';
import { JobMatch, CandidateMatch, MatchResult } from '../store/types';

export const matchService = {
  getJobMatch: async (jobId: number): Promise<MatchResult> => {
    const response = await api.get(`/match/job/${jobId}`);
    return response.data;
  },

  getMyJobMatches: async (): Promise<JobMatch[]> => {
    const response = await api.get('/match/my-matches');
    return response.data;
  },

  getCVMatchesForJob: async (jobId: number): Promise<CandidateMatch[]> => {
    const response = await api.get(`/match/job/${jobId}/candidates`);
    return response.data;
  },

  getAllCVMatches: async (): Promise<CandidateMatch[]> => {
    const response = await api.get('/match/all-candidates');
    return response.data;
  },
};