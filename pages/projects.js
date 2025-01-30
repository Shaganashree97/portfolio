export default function Projects() {
    const projects = [
      { name: 'Project 1', description: 'Proj 1 Descrp' },
      { name: 'Project 2', description: 'Proj 2 Descrp' },
    ];
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h2 className="text-2xl font-bold">{project.name}</h2>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }