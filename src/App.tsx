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
        {/* Background decorative elements */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cadastro/pf" element={<FormPF />} />
          <Route path="/cadastro/pj" element={<FormPJ />} />
          <Route path="/admin/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
