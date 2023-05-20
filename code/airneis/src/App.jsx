import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { DataContextProvider } from "./composants/context/dataContext";
import Footer from './composants/Footer';
import Menu from './composants/Menu';
import { AuthProvider } from './composants/context/authContext';

function App() {
  return (
    <AuthProvider>
      <DataContextProvider>
        <Menu />
        <Outlet />
        <div className="Min-heightConteiner-footer"></div>
        <Footer />
      </DataContextProvider>
    </AuthProvider>
  );
}

export default App;
