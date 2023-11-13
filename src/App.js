import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import FileManagement from './Components/FileManagement';
import Navbar from './Components/Navbar';
import Admin from './Components/Admin';
import FileList from './Components/FileList';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/fms" element={<FileManagement />} />
          <Route path="/admin" element={<Admin />}/>
          <Route path="/filelist" element={<FileList />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
