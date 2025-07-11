interface Approach {
  title: string;
  description: string;
}

const approaches: Approach[] = [
  {
    title: "Sprints",
    description: "Fast, focused engagements to explore, test, or move a critical piece forward—without getting bogged down."
  },
  {
    title: "Projects",
    description: "End-to-end design support for a product, brand, or web experience—with a defined scope and measurable outcomes."
  },
  {
    title: "Partnerships",
    description: "For companies that need more than a vendor—they want a design partner. We embed with your team and evolve alongside the business."
  }
];

export default function Approach() {
  return (
    <section id="approach" className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Our Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {approaches.map((approach, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold">{approach.title}</h3>
              <p className="text-gray-400">{approach.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
