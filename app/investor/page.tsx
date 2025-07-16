import StibeInvestorDetails from '../components/StibeInvestorDetails';
import Footer from '../components/Footer';

export default function InvestorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      {/* Background animated elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00b4ab] opacity-5 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-teal-400 opacity-5 animate-pulse blur-3xl"></div>
        <div className="absolute top-2/3 left-1/3 w-60 h-60 rounded-full bg-[#008a82] opacity-5 animate-float blur-3xl"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/assets/images/patterns/grid.svg')] opacity-10"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        <StibeInvestorDetails />
        <Footer />
      </div>
    </main>
  );
}
