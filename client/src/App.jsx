import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Sidenav from './Component/Navbar/Sidenav';
import Banner from './Component/HeroBanner/Banner';
import Card from './Component/VisaCards/Card';
import Services from './Component/Services/Services';
import Country from './Component/Country/Country';
import Footer from './Component/Footer/Footer';

function App() {
  return (
    <>
      <Sidenav />
      <div className="pt-10 md:pt-6 lg:pt-10">
        <Banner />
        <Card/>
        <Services/>
        <Country/>
        <Footer/>
      </div>
    </>
  );
}

export default App;