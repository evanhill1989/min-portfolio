export default function Blog() {
  return (
    <div className="page-content">
      <h2 className="text-4xl font-light mb-8">Blog</h2>
      <div className="space-y-8">
        <article className="blog-post">
          <h3 className="text-2xl font-medium mb-2">Blog Post Title</h3>
          <p className="text-muted-foreground mb-4">
            Published on January 1, 2024
          </p>
          <p className="mb-4">Blog post excerpt or full content...</p>
          <a href="#" className="text-primary hover:underline">
            Read more →
          </a>
        </article>
        {/* Add more blog posts */}
      </div>
    </div>
  );
}
