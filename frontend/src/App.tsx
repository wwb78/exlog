import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import LearningLogs from './pages/LearningLogs';
import CreateLearningLog from './pages/CreateLearningLog';
import Categories from './pages/Categories';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/logs" element={<LearningLogs />} />
            <Route path="/logs/create" element={<CreateLearningLog />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
