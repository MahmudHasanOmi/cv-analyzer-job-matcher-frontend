import api from './api';
import { CV } from '../store/types';

export const cvService = {
  uploadCV: async (file: File): Promise<{ cv: CV; message: string }> => {
    const formData = new FormData();
    formData.append('cv', file);
    
    const response = await api.post('/cv/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getMyCV: async (): Promise<CV> => {
    const response = await api.get('/cv/my-cv');
    return response.data;
  },

  deleteCV: async (): Promise<{ message: string }> => {
    const response = await api.delete('/cv/my-cv');
    return response.data;
  },

  getAllCVs: async (): Promise<CV[]> => {
    const response = await api.get('/cv/all');
    return response.data;
  },
};