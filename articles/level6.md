# Level 6 : 複数コンポーネント間のデータの流れを読む

**テーマ：** 追加・削除の操作が複数のコンポーネントをまたいでどう流れるかを読む。

---

## コード（3ファイル構成）

**App.tsx**

```tsx
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
      <ItemList items={items} onRemove={handleRemove} />
    </div>
  );
}

export default App;
```

**ItemList.tsx**

```tsx
type Props = {
  items: string[];
  onRemove: (index: number) => void;
};

function ItemList({ items, onRemove }: Props) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item} <button onClick={() => onRemove(index)}>削除</button></li>
      ))}
    </ul>
  );
}

export default ItemList;
```

**AddItem.tsx**

```tsx
import { useState } from 'react';

type Props = {
  onAdd: (newItem: string) => void;
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
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>追加</button>
    </div>
  );
}

export default AddItem;
```

---

## 問題

1. `items` はどのファイルで管理されているか？
2. `handleAdd` は何をしているか？`...items` の部分を説明せよ。
3. `handleRemove` は何をしているか？`.filter()` の部分を説明せよ。
4. 「追加」ボタンを押したとき、どのファイルのどの関数が最終的に実行されるか？
5. `items.map()` は何をしているか？

---

## 解答

1. **App.tsx**（`const [items, setItems] = useState<string[]>([])`）
2. **既存のリストに新しいアイテムを追加した新しい配列を作り `items` を更新する。**  
   `...items` は「今の配列の中身を全部展開する」スプレッド構文。`[...items, newItem]` = 今のリスト全部 + 新しいアイテム。
3. **指定した番号（index）の要素だけを除いた新しい配列を作り `items` を更新する。**  
   `.filter()` は条件に合う要素だけを残す関数。`i !== index`（番号が一致しないもの）だけ残す = 指定した要素を除く。
4. **AddItem.tsx の `handleSubmit` → `onAdd(text)` → App.tsx の `handleAdd`**
5. **配列の要素1つ1つに対して `<li>...</li>` を作り、それを並べて表示する。**

---

## 解説

**スプレッド構文（`...`）：**

```tsx
const items = ['りんご', 'バナナ'];
const newItems = [...items, 'みかん'];
// → ['りんご', 'バナナ', 'みかん']
```

**`filter()` による削除（index = 1 を削除する場合）：**

```tsx
const items = ['りんご', 'バナナ', 'みかん'];
const result = items.filter((_, i) => i !== 1);
// i=0: 0 !== 1 → true  → 残す
// i=1: 1 !== 1 → false → 除く
// i=2: 2 !== 1 → true  → 残す
// → ['りんご', 'みかん']
```

**データの流れまとめ：**

```
【追加の流れ】
AddItem: テキスト入力 → 追加ボタン押す
  → onAdd(text) を呼ぶ
    → App の handleAdd が動く
      → setItems([...items, newItem]) で items 更新
        → ItemList に新しい items が渡る → 画面に追加表示

【削除の流れ】
ItemList: 削除ボタン押す → onRemove(index) を呼ぶ
  → App の handleRemove が動く
    → setItems(items.filter(...)) で items 更新
      → ItemList に新しい items が渡る → 画面から消える
```

---

## 演習

**ステップ1：写経**

3つのファイルをそのまま打ち込んでください：

- `exercises/level6/App.tsx`
- `exercises/level6/ItemList.tsx`
- `exercises/level6/AddItem.tsx`

**ステップ2：改造問題**

以下の条件を満たすよう改造してください：

- すでにリストに**同じ名前のアイテムがある場合**、追加できない（無視する）ようにしてください  
  （ヒント：`items.includes(newItem)` を使うと、リストに同じ値が入っているか判定できます）

---

**改造後のコード例：**

**App.tsx**（`handleAdd` の中だけ変更）

```tsx
import { useState } from 'react';
import ItemList from './ItemList';
import AddItem from './AddItem';

function App() {
  const [items, setItems] = useState<string[]>([]);

  const handleAdd = (newItem: string) => {
    if (items.includes(newItem)) return;
    setItems([...items, newItem]);
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <AddItem onAdd={handleAdd} />
      <ItemList items={items} onRemove={handleRemove} />
    </div>
  );
}

export default App;
```

**ItemList.tsx・AddItem.tsx**（変更なし）

- `items.includes(newItem)` → リストの中に同じ文字列がすでにあれば `true`
- `true` なら `return` で止める → `setItems` は呼ばれない → リストに追加されない
