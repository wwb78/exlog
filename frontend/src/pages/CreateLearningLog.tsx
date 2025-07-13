import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { learningLogsApi, categoriesApi } from '../services/api';
import type { Category, CreateLearningLogRequest } from '../types';

const CreateLearningLog = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateLearningLogRequest>({
    title: '',
    description: '',
    category_id: 0,
    duration_minutes: 0,
    learned_at: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getAll();
        setCategories(response.data);
        if (response.data.length > 0) {
          setFormData(prev => ({ ...prev, category_id: response.data[0].id }));
        }
      } catch (err) {
        setError('カテゴリの読み込みに失敗しました');
        console.error('Categories fetch error:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category_id || formData.duration_minutes <= 0) {
      setError('必須項目を入力してください');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await learningLogsApi.create(formData);
      navigate('/logs');
    } catch (err) {
      setError('学習ログの作成に失敗しました');
      console.error('Create log error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateLearningLogRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">学習ログ追加</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            タイトル *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="学習内容のタイトル"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            詳細メモ
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="学習内容の詳細やメモ"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カテゴリ *
          </label>
          <select
            value={formData.category_id}
            onChange={(e) => handleInputChange('category_id', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value={0}>カテゴリを選択</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            学習時間（分） *
          </label>
          <input
            type="number"
            value={formData.duration_minutes}
            onChange={(e) => handleInputChange('duration_minutes', parseInt(e.target.value))}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            学習日 *
          </label>
          <input
            type="date"
            value={formData.learned_at}
            onChange={(e) => handleInputChange('learned_at', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '保存中...' : '保存'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/logs')}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLearningLog;