export const ImageBlock = ({ content, onChange }) => (
  <div className="glass-premium p-4">
    <input value={content.url||''} onChange={e=>onChange({...content,url:e.target.value})} placeholder="Image URL" className="w-full p-2 bg-surface-2 border border-border rounded" />
  </div>
);
