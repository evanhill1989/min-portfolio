export default function FavoriteWebsites() {
  return (
    <div className="page-content">
      <h2 className="text-4xl font-light mb-8">Favorite Websites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="website-card p-6 border border-border rounded-lg">
          <h3 className="text-xl font-medium mb-2">Website Name</h3>
          <p className="text-muted-foreground mb-4">
            Brief description of why you like this site...
          </p>
          <a
            href="#"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Site →
          </a>
        </div>
        {/* Add more websites */}
      </div>
    </div>
  );
}
