import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internship Registration | Pydart Intelli Corp',
  description: 'Register your college students for comprehensive internship programs at Pydart Intelli Corp. Industry-relevant training with expert mentorship and certification.',
  keywords: 'internship, training, students, college, programming, technology, certification, mentorship',
  openGraph: {
    title: 'Internship Registration | Pydart Intelli Corp',
    description: 'Register your college students for comprehensive internship programs at Pydart Intelli Corp.',
    type: 'website',
    url: '/internship',
  },
};

export default function InternshipLayout({
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
