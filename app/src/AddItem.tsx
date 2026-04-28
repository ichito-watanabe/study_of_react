import { useState } from 'react';

type Props = {
  onAdd: (item: string) => void;
};

function AddItem({ onAdd }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text === '') return;
    onAdd(text);
    setText('');
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSubmit}>追加</button>
    </div>
  );
}

export default AddItem;