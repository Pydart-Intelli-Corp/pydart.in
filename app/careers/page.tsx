import Career from '../components/Career';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers - PyDart | Join Our Team',
  description: 'Explore exciting career opportunities at PyDart. Join our team of innovators and shape the future of technology with competitive salaries, flexible working, and growth opportunities.',
  keywords: 'PyDart careers, jobs, Flutter developer, React Native developer, .NET developer, UI/UX designer, internships, Kochi jobs',
  openGraph: {
    title: 'Careers - PyDart | Join Our Team',
    description: 'Explore exciting career opportunities at PyDart. Join our team of innovators and shape the future of technology.',
    type: 'website',
  },
};

export default function CareersPage() {
  return <Career />;
}
