export const TextBlock = ({ content, onChange }) => (
  <div className="glass-premium p-4">
    <textarea value={content.text||''} onChange={e=>onChange({...content,text:e.target.value})} className="w-full p-2 bg-surface-2 border border-border rounded" rows="3" />
  </div>
);
