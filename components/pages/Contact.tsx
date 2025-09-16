export default function Contact() {
  return (
    <div className="page-content">
      <h2 className="text-4xl font-light mb-8">Contact</h2>
      <div className="space-y-6">
        <p className="text-lg">Let's work together!</p>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Email</h3>
            <a
              href="mailto:your.email@example.com"
              className="text-primary hover:underline"
            >
              your.email@example.com
            </a>
          </div>

          <div>
            <h3 className="font-medium">LinkedIn</h3>
            <a href="#" className="text-primary hover:underline">
              linkedin.com/in/yourprofile
            </a>
          </div>

          <div>
            <h3 className="font-medium">GitHub</h3>
            <a href="#" className="text-primary hover:underline">
              github.com/yourusername
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
