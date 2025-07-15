export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen bg-gray-200 text-black overflow-hidden">
      
      {/* Company Logo - Top Left */}
      <div className="absolute -top-5 left-6 md:left-10 lg:left-14 z-[100]">
        <a href="/" aria-label="Go to homepage" className="group block hover:scale-110 transition-transform duration-300 ease-out relative">
          <img src="/pydart_logo.png" alt="Pydart Logo" className="w-22 h-22 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain cursor-pointer hover:opacity-80 transition-opacity duration-300" />
        </a>
      </div>

      {/* Email Us Button - Top Right */}
      <div className="absolute top-8 right-4 md:right-6 lg:right-8 z-50">
        <a
          href="mailto:hello@pydart.com"
          className="text-[10px] md:text-xs lg:text-sm xl:text-[14px] font-medium group relative cursor-pointer overflow-hidden px-3 py-2 rounded-sm hover:bg-gray-100/20 transition-colors duration-200 block pointer-events-auto"
          style={{ pointerEvents: 'auto' }}
        >
          <span className="inline-block px-0.5 md:px-1 lg:px-1.5">
            <span className="relative">
              <span className="inline-block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1.5">
                Email Us
              </span>
              <span className="absolute top-0 left-0 transition-all duration-300 translate-y-full opacity-0 text-[#FF4D00] group-hover:-translate-y-0.5 group-hover:opacity-100">
                Email Us
              </span>
            </span>
            <span className="absolute left-1 md:left-1.5 lg:left-2 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2.5 md:group-hover:translate-y-3 text-[#FF4D00]">(</span>
            <span className="absolute right-1 md:right-1.5 lg:right-2 -top-1 md:-top-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2.5 md:group-hover:translate-y-3 text-[#FF4D00]">)</span>
          </span>
        </a>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-gray-200"></div>
          ))}
        </div>
      </div>

      {/* Centered Heading */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-12 lg:px-32">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] tracking-tight text-center w-full">
          We build AI-powered products and deliver advanced digital solutions
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center animate-bounce">
          <div className="w-[1px] h-8 bg-gray-300 mb-2"></div>
          <div className="w-2 h-2 border border-gray-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
