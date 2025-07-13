export interface Category {
  id: number;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface LearningLog {
  id: number;
  title: string;
  description: string;
  category: Category;
  category_id: number;
  duration_minutes: number;
  learned_at: string;
  created_at: string;
  updated_at: string;
}

export interface UserStat {
  total_xp: number;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface DashboardData {
  user_stat: UserStat;
  recent_logs: LearningLog[];
  weekly_duration_minutes: number;
  monthly_duration_minutes: number;
}

export interface LearningLogStats {
  total_duration_minutes: number;
  total_duration_hours: number;
  category_stats: Array<{
    category__name: string;
    total_duration: number;
    count: number;
  }>;
  total_logs: number;
}

export interface CreateLearningLogRequest {
  title: string;
  description?: string;
  category_id: number;
  duration_minutes: number;
  learned_at: string;
}

export interface CreateCategoryRequest {
  name: string;
  color: string;
}