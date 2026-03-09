import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BatchGenerator from './pages/BatchGenerator';
import History from './pages/History';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/batch" element={<BatchGenerator />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
