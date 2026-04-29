import { useState } from 'react';

type Props = {
onAdd: (title: string) => void;
};

function NoteForm({ onAdd }: Props) {
const [title, setTitle] = useState('');

const handleSubmit = () => {
    if (title === '') return;
    onAdd(title);
    setTitle('');
};

return (
    <div>
    <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
    />
    <button onClick={handleSubmit}>追加</button>
    </div>
);
}

export default NoteForm;