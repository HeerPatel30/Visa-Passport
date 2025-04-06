import './App.css';
import Sidenav from './Component/Navbar/Sidenav';
import Banner from './Component/HeroBanner/Banner';
import Card from './Component/VisaCards/Card';
import Services from './Component/Services/Services';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      {/* Top Navbar */}
      <Sidenav />

      {/* Main Content */}
      <main className="pt-20 px-4 sm:px-6 md:px-8 space-y-6">
        <Banner />
        <Card />
        <Services />
      </main>
    </div>
  );
}

export default App;
