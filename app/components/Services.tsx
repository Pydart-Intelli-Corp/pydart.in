interface Service {
  title: string;
  description: string;
}

const services: Service[] = [
  {
    title: "UX/UI Design",
    description: "Digital product experiences that engage, convert, and keep users coming back. Every interface is crafted to bridge user needs with business goals.",
  },
  {
    title: "AI UX",
    description: "AI-driven experiences that help users work smarter, faster, and with confidence. We focus on making AI feel natural and intuitive.",
  },
  {
    title: "Digital Product Strategy",
    description: "From first insight to first build, we help teams get clear on priorities, align fast, and move with purpose.",
  },
  {
    title: "Design Systems",
    description: "Scalable systems that bring consistency to design, efficiency to engineering, and alignment across teams.",
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
