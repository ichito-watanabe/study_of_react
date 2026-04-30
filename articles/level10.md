# Level 10 : 実際のアプリコードを小さく分解して読む

**テーマ：** これまで学んだすべての流れ（props・コールバック・API取得・状態管理）が組み合わさったコードを横断的に読む。

---

## コード（3ファイル構成）

**app/src/App.tsx**

```tsx
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
```

**app/src/NoteList.tsx**

```tsx
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
```

**app/src/NoteForm.tsx**

```tsx
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
```

---

## 問題

1. `notes` はどのファイルで管理されているか？また、なぜ `useEffect` で取得する前から空配列 `[]` を初期値にしているか？
2. 「追加」ボタンを押したとき、どのファイルのどの関数が順番に呼ばれるか説明せよ。
3. `handleAdd` の中の `Date.now()` は何のために使っているか？
4. 「削除」ボタンを押したとき、`NoteList` から `App` まで何が伝わるか？
5. `NoteList` の中に `useState` はあるか？なぜか？

---

## 解答

1. `App.tsx` で管理。`useState` には初期値が必要で、API取得は非同期なので表示時点では空配列を入れておく
2. `NoteForm` の `handleSubmit` → `onAdd(title)` → `App` の `handleAdd` → `setNotes` でリスト更新 → `setTitle('')` でフォームリセット
3. ユニークな `id` を生成するため。今の時刻をミリ秒の数値で取得するので毎回異なる値になる
4. `onDelete(note.id)` が呼ばれ、`App` の `handleDelete` に削除対象の `id` が渡される
5. ない。表示とコールバックの受け渡しだけを担当しており、データの管理は `App` が行っているから

---

## 解説

---

## 演習

**改造問題（2つ、それぞれ別ファイルの変更）**

1. **`app/src/NoteForm.tsx`** を修正：`title` が空のとき「追加」ボタンを `disabled` にしてください
2. **`app/src/App.tsx`** を修正：`handleAdd` の中で、同じタイトルのノートがすでにあれば追加しないようにしてください  
   （ヒント：`notes.some((note) => note.title === title)` で「同じタイトルが存在するか」を判定できます）

**よくある間違い：**

```tsx
// NG：if の条件を {} で囲んでいる
if {notes.some((note) => note.title === title) return; }

// NG：== を使っている（TypeScript では === を使う）
disabled={title == ''}

// OK
if (notes.some((note) => note.title === title)) return;
disabled={title === ''}
```


