export default function Resume() {
  return (
    <div className="page-content">
      <h2 className="text-4xl font-light mb-8">Resume</h2>
      <div className="space-y-8">
        <section>
          <h3 className="text-2xl font-medium mb-4">Experience</h3>
          <div className="space-y-4">
            <div className="experience-item">
              <h4 className="text-xl font-medium">Job Title</h4>
              <p className="text-muted-foreground">Company • 2023 - Present</p>
              <p className="mt-2">Job description and achievements...</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-medium mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-secondary rounded-full text-sm">
              React
            </span>
            <span className="px-3 py-1 bg-secondary rounded-full text-sm">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-secondary rounded-full text-sm">
              Next.js
            </span>
            {/* Add more skills */}
          </div>
        </section>
      </div>
    </div>
  );
}
