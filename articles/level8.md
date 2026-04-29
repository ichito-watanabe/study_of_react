# Level 8 : API/DBに渡されるデータを読む

**テーマ：** 画面を開いたときにAPIからデータを取得して表示する流れを読む。

---

## コード（1ファイル構成）

**app/src/App.tsx**

```tsx
import { useState, useEffect } from 'react';

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

  if (loading) return <p>読み込み中…</p>;

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
}

export default App;
```

---

## 問題

1. `useEffect` はいつ実行されるか？
2. `loading` の初期値が `false` ではなく `true` なのはなぜか？
3. `fetch('/api/notes')` は「画面表示・入力処理・保存処理」のどれか？
4. `setNotes(data)` で `notes` に入るのはどんな形のデータか？
5. `if (loading) return <p>読み込み中…</p>` は何をしているか？

---

## 解答

1. コンポーネントが最初に画面に表示されたとき、Reactが自動で1回だけ実行する
2. 画面を開いた瞬間はまだデータが来ていないので、最初から「読み込み中」を表示するため
3. データ取得処理。`/api/notes` にGETリクエストを送り、ノート一覧を受け取る
4. `{ id: number, title: string }` の形のオブジェクトが複数入った配列
5. `loading=true` の間はリストを表示せず「読み込み中…」だけを返す（早期リターン）

---

## 解説

---

## 演習

**ステップ1：写経**

`app/src/App.tsx` の中身を上のコードに書き換えて、動作を確認してください。  
（`fetch` は実際のAPIがないためエラーになりますが、それは想定内です）

**ステップ2：改造問題**

以下の条件を満たすよう改造してください：

- `notes` が空（1件もない）のとき、リストの代わりに **「ノートがありません」** と表示する  
  （ヒント：`notes.length === 0` で「配列が空かどうか」を判定できます）

---

**改造後のコード例：**

**app/src/App.tsx**

```tsx
import { useState, useEffect } from 'react';

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

  if (loading) return <p>読み込み中…</p>;
  if (notes.length === 0) return <p>ノートがありません</p>;

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
}

export default App;
```

- `notes.length === 0` で配列が空かどうか判定
- `loading` の早期リターンと同じ書き方で、空のときも早期リターンする

**よくある間違い：**

```tsx
// NG：res が抜けている
.then((res) => .json())

// NG：note（1件）ではなく notes（配列全体）を使っている
<li key={notes.id}>{notes.title}</li>

// OK
.then((res) => res.json())
<li key={note.id}>{note.title}</li>
```

