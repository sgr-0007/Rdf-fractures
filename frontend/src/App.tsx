import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';


function App() {

  return (
    <Router>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        <Header />
        <div className="flex h-screen w-screen flex-row">
          <div className="flex flex-col w-full h-full flex-1 scroll-auto overflow-scroll">
            <Routes>
              <Route path="/" element={<Dashboard />} />

      
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
