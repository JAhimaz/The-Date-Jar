import React from 'react';
import '../css/App.css';
import { UserAuthContextProvider } from "../context/UserAuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Login from '../components/Login';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
