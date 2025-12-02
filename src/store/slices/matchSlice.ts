import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { matchService } from '../../services/matchService';
import { MatchState } from '../types';

const initialState: MatchState = {
  jobMatches: [],
  candidateMatches: [],
  currentMatch: null,
  loading: false,
  error: null,
};

export const getMyJobMatches = createAsyncThunk(
  'match/getJobMatches',
  async (_, { rejectWithValue }) => {
    try {
      return await matchService.getMyJobMatches();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch matches');
    }
  }
);

export const getCVMatchesForJob = createAsyncThunk(
  'match/getCVMatches',
  async (jobId: number, { rejectWithValue }) => {
    try {
      return await matchService.getCVMatchesForJob(jobId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch candidates');
    }
  }
);

export const getAllCVMatches = createAsyncThunk(
  'match/getAllCVMatches',
  async (_, { rejectWithValue }) => {
    try {
      return await matchService.getAllCVMatches();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch candidates');
    }
  }
);

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyJobMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyJobMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.jobMatches = action.payload;
      })
      .addCase(getMyJobMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCVMatchesForJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCVMatchesForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.candidateMatches = action.payload;
      })
      .addCase(getCVMatchesForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllCVMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCVMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.candidateMatches = action.payload;
      })
      .addCase(getAllCVMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = matchSlice.actions;
export default matchSlice.reducer;
