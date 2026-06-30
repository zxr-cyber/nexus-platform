export const HeroBlock = ({ content, onChange }) => (
  <div className="glass-premium p-6 text-center">
    <input value={content.title||''} onChange={e=>onChange({...content,title:e.target.value})} placeholder="Title" className="w-full p-2 bg-surface-2 border border-border rounded" />
  </div>
);
