import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            ExLog
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-500'
              }`}
            >
              ダッシュボード
            </Link>
            <Link
              to="/logs"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/logs') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-500'
              }`}
            >
              学習ログ
            </Link>
            <Link
              to="/logs/create"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/logs/create') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-500'
              }`}
            >
              ログ追加
            </Link>
            <Link
              to="/categories"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/categories') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-500'
              }`}
            >
              カテゴリ管理
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;