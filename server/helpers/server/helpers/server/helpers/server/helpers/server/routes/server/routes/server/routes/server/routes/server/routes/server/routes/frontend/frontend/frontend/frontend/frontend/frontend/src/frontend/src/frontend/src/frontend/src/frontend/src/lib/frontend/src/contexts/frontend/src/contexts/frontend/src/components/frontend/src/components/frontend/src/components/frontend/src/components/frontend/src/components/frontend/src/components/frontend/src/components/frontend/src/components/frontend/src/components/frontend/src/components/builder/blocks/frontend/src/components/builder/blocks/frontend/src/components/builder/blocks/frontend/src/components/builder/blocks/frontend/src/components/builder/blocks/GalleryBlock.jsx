export const GalleryBlock = ({ content, onChange }) => (
  <div className="glass-premium p-4">
    <p className="text-sm text-text-muted">Gallery: {content.images?.length || 0} images</p>
  </div>
);
