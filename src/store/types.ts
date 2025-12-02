export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  company?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface CV {
  id: number;
  userId: number;
  fileName: string;
  filePath: string;
  extractedSkills: string[];
  education: string;
  experience: string;
  rawText: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface CVState {
  cv: CV | null;
  allCVs: CV[];
  loading: boolean;
  error: string | null;
}

export interface Job {
  id: number;
  recruiterId: number;
  title: string;
  description: string;
  requiredSkills: string[];
  experience: string;
  education: string;
  createdAt: string;
  updatedAt: string;
  recruiter: {
    id: number;
    name: string;
    company?: string;
  };
}

export interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  myJobs: Job[];
  loading: boolean;
  error: string | null;
}

export interface MatchResult {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export interface JobMatch extends Job, MatchResult {}

export interface CandidateMatch {
  cvId: number;
  userId: number;
  userName: string;
  userEmail: string;
  extractedSkills: string[];
  education: string;
  experience: string;
  bestMatch: MatchResult;
  // matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export interface MatchState {
  jobMatches: JobMatch[];
  candidateMatches: CandidateMatch[];
  currentMatch: MatchResult | null;
  loading: boolean;
  error: string | null;
}