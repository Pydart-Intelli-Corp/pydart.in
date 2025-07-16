import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Script from "next/script";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "PyDart - Intelligent Technology Solutions",
  description: "PyDart delivers innovative software development, embedded systems, and AI integration solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="" 
        />
      </head>
      <body
        className={`${poppins.variable} font-poppins antialiased bg-gradient-to-b from-background-dark to-gray-900 text-white`}
      >
        <div className="fixed top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center pointer-events-none z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'url(/assets/icons/future.png)' }} />
             
        <ThemeProvider initialAnimationLevel="normal">
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
        
        {/* Background gradient animation */}
        <div className="fixed bottom-0 left-0 right-0 h-1/2 bg-gradient-conic animate-rotate opacity-20 pointer-events-none -z-10" 
             style={{ filter: 'blur(80px)' }} />
             
        {/* Add smooth page transitions */}
        <Script id="page-transitions">
          {`
            document.addEventListener('DOMContentLoaded', () => {
              const links = document.querySelectorAll('a[href^="/"]:not([target="_blank"])');
              links.forEach(link => {
                link.addEventListener('click', e => {
                  const href = link.getAttribute('href');
                  if (href.startsWith('/')) {
                    e.preventDefault();
                    document.body.classList.add('page-transition-out');
                    setTimeout(() => {
                      window.location.href = href;
                    }, 300);
                  }
                });
              });
              
              window.addEventListener('pageshow', () => {
                document.body.classList.add('page-transition-in');
                setTimeout(() => {
                  document.body.classList.remove('page-transition-in');
                }, 500);
              });
            });
          `}
        </Script>
      </body>
    </html>
  );
}
