type Note = {
  id: number;
  title: string;
};

type Props = {
  notes: Note[];
  onDelete: (id: number) => void;
};

function NoteList({ notes, onDelete }: Props) {
  if (notes.length === 0) return <p>ノートがありません</p>;

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          {note.title}
          <button onClick={() => onDelete(note.id)}>削除</button>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;