export const TableBlock = ({ content, onChange }) => (
  <div className="glass-premium p-4">
    <input value={content.tableName||''} onChange={e=>onChange({...content,tableName:e.target.value})} placeholder="Table name" className="w-full p-2 bg-surface-2 border border-border rounded" />
  </div>
);
