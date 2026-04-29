import {useState, useEffect} from 'react';

type Note = {
  id: number;
  title: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=> {
    fetch('/api/notes')
    .then((res) =>res.json())
    .then((data) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p> 読み込み中...</p>;
  if (notes.length ===0) return <p> ノートがありません</p>;

  return (
    <ul>
      {notes.map((note) => (
        <li key= {note.id}>{note.title}</li>
      ))}
    </ul>
  );
}

export default App;