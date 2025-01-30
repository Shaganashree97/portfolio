export default function Skills() {
    const skills = ['Web Dev'];
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Skills</h1>
        <ul className="list-disc pl-5">
          {skills.map((skill, index) => (
            <li key={index} className="text-lg">{skill}</li>
          ))}
        </ul>
      </div>
    );
  }