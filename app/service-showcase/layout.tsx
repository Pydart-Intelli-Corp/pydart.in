import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - PyDart | Comprehensive Digital Solutions',
  description: 'Explore our range of services including web & mobile development, UI/UX design, AI integration, cloud solutions, and digital marketing.',
  keywords: 'PyDart services, web development, mobile apps, UI/UX design, AI integration, cloud solutions, digital marketing',
  openGraph: {
    title: 'Services - PyDart | Comprehensive Digital Solutions',
    description: 'Discover how our comprehensive services can transform your digital presence.',
    type: 'website',
  },
};

export default function ServiceShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
