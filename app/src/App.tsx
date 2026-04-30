import { useState, useEffect } from 'react';
import NoteList from './NoteList';
import NoteForm from './NoteForm';

type Note = {
  id: number;
  title: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      });
  }, []);

  const handleAdd = (title: string) => {
    if (notes.some((note) => note.title === title)) return;
    const newNote: Note = { id: Date.now(), title };
    setNotes([...notes, newNote]);
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  if (loading) return <p>読み込み中…</p>;

  return (
    <div>
      <NoteForm onAdd={handleAdd} />
      <NoteList notes={notes} onDelete={handleDelete} />
    </div>
  );
}

export default App;