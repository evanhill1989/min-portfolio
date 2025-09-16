export default function Projects() {
  return (
    <div className="page-content">
      <h2 className="text-4xl font-light mb-8">Projects</h2>
      <div className="space-y-6">
        <div className="project-item">
          <h3 className="text-2xl font-medium mb-2">Project Name</h3>
          <p className="text-muted-foreground mb-4">
            Project description goes here...
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-primary hover:underline">
              Live Demo
            </a>
            <a href="#" className="text-primary hover:underline">
              GitHub
            </a>
          </div>
        </div>
        {/* Add more projects */}
      </div>
    </div>
  );
}
