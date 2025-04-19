import './App.css';
import Sidenav from './Component/Navbar/Sidenav';
import Banner from './Component/HeroBanner/Banner';
import Card from './Component/VisaCards/Card';
import Services from './Component/Services/Services';
import Country from './Component/Country/Country';
import Footer from './Component/Footer/Footer';
import About from './Component/Aboutus/About';


function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      {/* Top Navbar */}
      <Sidenav />

      {/* Main Content */}
      <main className="pt-20 px-4 sm:px-6 md:px-8 space-y-6">
        <Banner />
        <About/>
        <Card />
        <Services />
        <Country/>

      </main>

        <Footer/>
    </div>
  );
}

export default App;

