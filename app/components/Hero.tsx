export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Scrolling Background Text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-5">
        <div className="animate-slide whitespace-nowrap text-[200px] font-medium tracking-tight">
          PYDART · hello@pydart.com · PYDART · hello@pydart.com ·
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter">
            We&apos;re a design studio for product and brand teams who mean business.
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-400 max-w-3xl">
            Global teams trust us to take on complex challenges, push creative boundaries,
            and move fast when it matters most.
          </p>
        </div>
      </div>
    </section>
  );
}
