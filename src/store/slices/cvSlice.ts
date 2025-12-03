import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cvService } from '../../services/cvService';
import { CVState } from '../types';

const initialState: CVState = {
  cv: null,
  allCVs: [],
  loading: false,
  error: null,
};

export const uploadCV = createAsyncThunk(
  'cv/upload',
  async (file: File, { rejectWithValue }) => {
    try {
      const response = await cvService.uploadCV(file);
      return response.cv;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'CV upload failed');
    }
  }
);

export const getMyCV = createAsyncThunk(
  'cv/getMy',
  async (_, { rejectWithValue }) => {
    try {
      return await cvService.getMyCV();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch CV');
    }
  }
);

export const deleteCV = createAsyncThunk(
  'cv/delete',
  async (_, { rejectWithValue }) => {
    try {
      await cvService.deleteCV();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete CV');
    }
  }
);

export const getAllCVs = createAsyncThunk(
  'cv/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await cvService.getAllCVs();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch CVs');
    }
  }
);

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload CV
      .addCase(uploadCV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadCV.fulfilled, (state, action) => {
        state.loading = false;
        state.cv = action.payload;
      })
      .addCase(uploadCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get My CV
      .addCase(getMyCV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyCV.fulfilled, (state, action) => {
        state.loading = false;
        state.cv = action.payload;
      })
      .addCase(getMyCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete CV
      .addCase(deleteCV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCV.fulfilled, (state) => {
        state.loading = false;
        state.cv = null;
      })
      .addCase(deleteCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get All CVs
      .addCase(getAllCVs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCVs.fulfilled, (state, action) => {
        state.loading = false;
        state.allCVs = action.payload;
      })
      .addCase(getAllCVs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = cvSlice.actions;
export default cvSlice.reducer;

