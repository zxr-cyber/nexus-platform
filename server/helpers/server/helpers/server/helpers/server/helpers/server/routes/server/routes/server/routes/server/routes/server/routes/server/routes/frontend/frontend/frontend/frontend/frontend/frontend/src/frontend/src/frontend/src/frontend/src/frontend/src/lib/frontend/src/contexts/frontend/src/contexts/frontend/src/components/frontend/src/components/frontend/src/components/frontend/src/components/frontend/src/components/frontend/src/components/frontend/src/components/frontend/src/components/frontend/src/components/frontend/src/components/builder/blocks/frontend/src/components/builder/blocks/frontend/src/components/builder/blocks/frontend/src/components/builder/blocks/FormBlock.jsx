export const FormBlock = ({ content, onChange }) => (
  <div className="glass-premium p-4">
    <input value={content.submitText||''} onChange={e=>onChange({...content,submitText:e.target.value})} placeholder="Submit text" className="w-full p-2 bg-surface-2 border border-border rounded" />
  </div>
);
