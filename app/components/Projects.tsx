// interface Project {
//   title: string;
//   description: string;
//   image: string;
// }

// const projects: Project[] = [
//   {
//     title: "Everstream Analytics",
//     description: "Supply chain risk analytics platform",
//     image: "/project1.jpg"
//   },
//   {
//     title: "Center",
//     description: "Modern spend management solution",
//     image: "/project2.jpg"
//   },
//   {
//     title: "Flashpoint",
//     description: "Intelligence platform redesign",
//     image: "/project3.jpg"
//   }
// ];

// export default function Projects() {
//   return (
//     <section id="projects" className="py-24 bg-white">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl md:text-4xl font-bold mb-16">Our Projects</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projects.map((project, index) => (
//             <div key={index} className="group relative overflow-hidden rounded-lg">
//               <div className="aspect-w-16 aspect-h-9 bg-gray-100">
//                 <div className="absolute inset-0 flex items-center justify-center text-gray-500">
//                   {project.title}
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold">{project.title}</h3>
//                 <p className="text-gray-600 mt-1">{project.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
