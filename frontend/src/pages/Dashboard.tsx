import { useState, useEffect } from 'react';
import { userStatsApi } from '../services/api';
import type { DashboardData } from '../types';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await userStatsApi.getDashboard();
        setDashboardData(response.data);
      } catch (err) {
        setError('ダッシュボードの読み込みに失敗しました');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600 text-lg">データが見つかりません</div>
      </div>
    );
  }

  const { user_stat, recent_logs, weekly_duration_minutes, monthly_duration_minutes } = dashboardData;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
      
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold">レベル</h3>
          <p className="text-3xl font-bold">{user_stat.level}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold">累計XP</h3>
          <p className="text-3xl font-bold">{user_stat.total_xp}</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold">今週の学習時間</h3>
          <p className="text-3xl font-bold">{Math.round(weekly_duration_minutes / 60 * 10) / 10}h</p>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold">今月の学習時間</h3>
          <p className="text-3xl font-bold">{Math.round(monthly_duration_minutes / 60 * 10) / 10}h</p>
        </div>
      </div>

      {/* Recent Logs */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">最近の学習ログ</h2>
        {recent_logs.length === 0 ? (
          <p className="text-gray-500">まだ学習ログがありません</p>
        ) : (
          <div className="space-y-3">
            {recent_logs.map((log) => (
              <div key={log.id} className="border-b pb-3 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{log.title}</h3>
                    <p className="text-sm text-gray-600">{log.description}</p>
                    <div className="flex items-center mt-1">
                      <span 
                        className="inline-block w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: log.category.color }}
                      ></span>
                      <span className="text-sm text-gray-500">{log.category.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{log.duration_minutes}分</p>
                    <p className="text-xs text-gray-400">{new Date(log.learned_at).toLocaleDateString('ja-JP')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;