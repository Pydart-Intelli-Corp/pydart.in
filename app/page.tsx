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
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Projects />
      <Services />
      <Investments />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
