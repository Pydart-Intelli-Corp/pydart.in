import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Investments from './components/Investments';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background-dark to-gray-900">
      {/* Background animated elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-blue opacity-5 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-accent-purple opacity-5 animate-pulse blur-3xl"></div>
        <div className="absolute top-2/3 left-1/3 w-60 h-60 rounded-full bg-primary opacity-5 animate-float blur-3xl"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <Projects />
        <Services />
        <Investments />
        <About />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
