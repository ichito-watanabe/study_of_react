import { useState } from 'react';
import ItemList from './ItemList';
import AddItem from './AddItem';

function App() {
  const [items, setItems] = useState<string[]>([]);

  const handleAdd = (newItem: string) => {
    setItems([...items, newItem]);
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  return (
    <div>
      <AddItem onAdd={handleAdd} />
      <ItemList items={items} onRemove = {handleRemove}/>
    </div>
  );
}

export default App;