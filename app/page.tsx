import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import Approach from './components/Approach';
import Contact from './components/Contact';
import Header from './components/Header';

export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      <Header />
      <Hero />
      <Services />
      <Work />
      <Approach />
      <Contact />
    </main>
  );
}
