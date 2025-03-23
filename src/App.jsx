import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Sidenav from './Component/Navbar/Sidenav';
import Banner from './Component/HeroBanner/Banner';

function App() {
  return (
    <>
      <Sidenav />
      <div className="pt-10 md:pt-6 lg:pt-10">
        <Banner />
      </div>
    </>
  );
}

export default App;