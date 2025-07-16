interface InvestmentHighlight {
  icon: string;
  title: string;
  description: string;
}

interface MarketStat {
  value: string;
  label: string;
}

const investmentHighlights: InvestmentHighlight[] = [
  {
    icon: "🏁",
    title: "Currently Bootstrapped",
    description: "Built with passion and vision. We've come this far without external funding — driven by commitment and belief in Stibe's potential."
  },
  {
    icon: "🚀",
    title: "Open to Strategic Investors",
    description: "Looking for the right partners to join us — not just for funding, but for vision alignment, mentorship, and scaling expertise."
  },
  {
    icon: "🧲",
    title: "Seeking Visionary Partners",
    description: "We want investors who believe in disruptive ideas, long-term growth, and backing passionate founders with hands-on execution."
  }
];

const marketStats: MarketStat[] = [
  { value: "$26B+", label: "Indian Grooming Market" },
  { value: "$911B+", label: "Global Market Size" },
  { value: "1st", label: "Inclusive Platform of its Kind" }
];

const whyInvestPoints = [
  "Massive Market: $26B+ grooming industry in India, $911B+ globally",
  "Untapped Opportunity: First-of-its-kind grooming platform to include freelancers, salons, and pet groomers",
  "High Scalability: Tech-enabled, UPI-integrated, and built for city-by-city expansion",
  "Strong Early Foundation: MVP launch planned, market study completed, product development in progress",
  "Hyper-Inclusive Model: Men, women, kids, pets — we serve all with verified, on-demand services",
  "Revenue Model in Place: Commission-based, ad space, and future subscriptions"
];

export default function Investments() {
  return (
    <section id="investments" className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            💼 Investors Section
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform the grooming industry with us. Join our journey to build India's most inclusive grooming platform.
          </p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {marketStats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Investment Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {investmentHighlights.map((highlight, index) => (
            <div key={index} className="p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl mb-4">{highlight.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">{highlight.title}</h3>
              <p className="text-gray-300 leading-relaxed">{highlight.description}</p>
            </div>
          ))}
        </div>

        {/* Why Invest Section */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            💡 <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Why Invest in Stibe?</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyInvestPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-800/20 rounded-lg">
                <div className="text-green-400 mt-1">✓</div>
                <p className="text-gray-300">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 md:p-12 border border-gray-700">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            📞 Let's Build the Future of Grooming, Together
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Want to learn more or request our pitch deck?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:info.pydart@gmail.com" 
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              📧 info.pydart@gmail.com
            </a>
            <span className="text-gray-400">or</span>
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-3 border-2 border-blue-500 text-blue-400 font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Contact Form
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
