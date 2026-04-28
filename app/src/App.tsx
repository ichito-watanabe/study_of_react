import { useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (title === '') return;
    setSaving(true);

    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    setSaving(false);
    setSaved(true);
    setTitle("")
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSave} disabled={saving || saved}>
        {saving ? '保存中…' : '保存'}
      </button>
      {saved && <p>保存しました</p> }
    </div>
  );
}

export default App;