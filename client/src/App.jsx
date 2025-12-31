import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

import Sidenav from "./Component/Navbar/Sidenav";
import Banner from "./Component/HeroBanner/Banner";
import Card from "./Component/VisaCards/Card";
import Services from "./Component/Services/Services";
import Country from "./Component/Country/Country";
import Footer from "./Component/Footer/Footer";
import About from "./Component/Aboutus/About";
import ContactUs from "./Component/Contact/Contact";
import PassportApplicationForm from "./Component/Passportform/Passport";
import Dashboard from "./Component/Dashboard/Dashboard";
import LoginPage from "./Component/Login/Login";
import VisaApplicationForm from "./Component/Visaform/Visa";
import PassportSearch from "./Component/Search/Search";

// Component to handle scrolling to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen overflow-x-hidden bg-gray-50 flex flex-col">
        {/* Top Navbar */}
        <Sidenav />

        {/* Main Content */}
        <main className="flex-grow pt-20 px-4 sm:px-6 md:px-8 space-y-6">
          <Routes>
            {/* Landing Page Route with IDs for anchor scrolling */}
            <Route
              path="/"
              element={
                <div className="space-y-12">
                  <section id="hero"><Banner /></section>
                  <section id="about"><About /></section>
                  <section id="visa-cards"><Card /></section>
                  <section id="services"><Services /></section>
                  <section id="countries"><Country /></section>
                </div>
              }
            />

            {/* Individual Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/visa-cards" element={<Card />} />
            <Route path="/countries" element={<Country />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/passportform" element={<PassportApplicationForm />} />
            <Route path="/visaform" element={<VisaApplicationForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<PassportSearch />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;