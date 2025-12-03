import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobService } from '../../services/jobService';
import { JobState } from '../types';

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
  myJobs: [],
  loading: false,
  error: null,
};

export const createJob = createAsyncThunk(
  'job/create',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await jobService.createJob(data);
      return response.job;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create job');
    }
  }
);

export const updateJob = createAsyncThunk(
  'job/update',
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    try {
      const response = await jobService.updateJob(id, data);
      return response.job;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update job');
    }
  }
);

export const deleteJob = createAsyncThunk(
  'job/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await jobService.deleteJob(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete job');
    }
  }
);

export const getAllJobs = createAsyncThunk(
  'job/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await jobService.getAllJobs();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch jobs');
    }
  }
);

export const getMyJobs = createAsyncThunk(
  'job/getMy',
  async (_, { rejectWithValue }) => {
    try {
      return await jobService.getMyJobs();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch jobs');
    }
  }
);

export const getJob = createAsyncThunk(
  'job/getOne',
  async (id: number, { rejectWithValue }) => {
    try {
      return await jobService.getJob(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch job');
    }
  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.myJobs.unshift(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Job
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.myJobs.findIndex(j => j.id === action.payload.id);
        if (index !== -1) state.myJobs[index] = action.payload;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Job
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.myJobs = state.myJobs.filter(j => j.id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get All Jobs
      .addCase(getAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get My Jobs
      .addCase(getMyJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.myJobs = action.payload;
      })
      .addCase(getMyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Single Job
      .addCase(getJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload;
      })
      .addCase(getJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
