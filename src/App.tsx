import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { FormPF } from './pages/FormPF';
import { FormPJ } from './pages/FormPJ';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register/pf" element={<FormPF />} />
          <Route path="/register/pj" element={<FormPJ />} />
          <Route path="/admin/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
