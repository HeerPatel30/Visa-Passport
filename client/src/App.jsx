import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Sidenav from "./Component/Navbar/Sidenav";
import Banner from "./Component/HeroBanner/Banner";
import Card from "./Component/VisaCards/Card";
import Services from "./Component/Services/Services";
import Country from "./Component/Country/Country";
import Footer from "./Component/Footer/Footer";
import About from "./Component/Aboutus/About";
import ContactUs from "./Component/Contact/Contact";

function App() {
  return (
    <Router>
      <div className="min-h-screen overflow-x-hidden bg-gray-50">
        {/* Top Navbar */}
        <Sidenav />

        {/* Main Content */}
        <main className="pt-20 px-4 sm:px-6 md:px-8 space-y-6">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <About />
                  <Card />
                  <Services />
                  <Country />
                </>
              }
            />

            {/* You can add more routes like this */}
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/visa-cards" element={<Card />} />
            <Route path="/countries" element={<Country />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;