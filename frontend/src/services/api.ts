import axios from 'axios';
import type {
  Category,
  LearningLog,
  UserStat,
  DashboardData,
  LearningLogStats,
  CreateLearningLogRequest,
  CreateCategoryRequest,
} from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests (for future use)
api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Learning Logs API
export const learningLogsApi = {
  getAll: (params?: {
    category?: number;
    date_from?: string;
    date_to?: string;
    search?: string;
    ordering?: string;
  }) => api.get<LearningLog[]>('/logs/', { params }),
  
  getById: (id: number) => api.get<LearningLog>(`/logs/${id}/`),
  
  create: (data: CreateLearningLogRequest) => 
    api.post<LearningLog>('/logs/', data),
  
  update: (id: number, data: Partial<CreateLearningLogRequest>) => 
    api.put<LearningLog>(`/logs/${id}/`, data),
  
  delete: (id: number) => api.delete(`/logs/${id}/`),
  
  getStats: (params?: { period?: string }) => 
    api.get<LearningLogStats>('/logs/stats/', { params }),
};

// Categories API
export const categoriesApi = {
  getAll: (params?: { search?: string }) => 
    api.get<Category[]>('/categories/', { params }),
  
  getById: (id: number) => api.get<Category>(`/categories/${id}/`),
  
  create: (data: CreateCategoryRequest) => 
    api.post<Category>('/categories/', data),
  
  update: (id: number, data: Partial<CreateCategoryRequest>) => 
    api.put<Category>(`/categories/${id}/`, data),
  
  delete: (id: number) => api.delete(`/categories/${id}/`),
};

// User Stats API
export const userStatsApi = {
  getDashboard: () => api.get<DashboardData>('/user-stats/dashboard/'),
  getAll: () => api.get<UserStat[]>('/user-stats/'),
};

export default api;