# Level 9 : 「仮データ」と「保存済みデータ」を区別する

**テーマ：** 編集中の一時的なデータと、確定した保存済みデータの違いを読む。

---

## コード（1ファイル構成）

**app/src/App.tsx**

```tsx
import { useState } from 'react';

type Note = {
  id: number;
  title: string;
};

function App() {
  const [saved, setSaved] = useState<Note>({ id: 1, title: '買い物リスト' });
  const [draft, setDraft] = useState(saved.title);

  const handleSave = () => {
    setSaved({ ...saved, title: draft });
  };

  return (
    <div>
      <p>保存済み：{saved.title}</p>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
      <button onClick={handleSave}>保存</button>
    </div>
  );
}

export default App;
```

---

## 問題

1. `saved` と `draft` はそれぞれ何を表しているか？
2. 入力欄を変更しても `saved.title` はすぐには変わらない。なぜか？
3. `handleSave` を呼ぶと何が起きるか？
4. `{ ...saved, title: draft }` は何をしているか？
5. ボタンを押す前に入力欄を「夕飯リスト」に変えた。このとき `saved.title` と `draft` の値はそれぞれいくつか？

---

## 解答

1. `saved`＝確定済みの保存データ（Note オブジェクト1件）、`draft`＝入力欄の編集中タイトル（一時データ）
2. `onChange` は `setDraft` しか呼ばないので `draft` だけ変わる。`saved` は `handleSave` を呼ぶまで変わらない
3. `setSaved` で `saved` が新しいオブジェクトに書き換わる
4. `saved` の全プロパティをコピーしつつ `title` だけ `draft` の値で上書きした新しいオブジェクトを作る
5. `saved.title`＝'買い物リスト'（ボタンを押していないので変わらない）、`draft`＝'夕飯リスト'

---

## 解説

`...` （スプレッド構文）はオブジェクトと配列で使い方が異なる：

```ts
// オブジェクトの展開 → プロパティをコピーして一部だけ上書き
{ ...saved, title: draft }
// → { id: 1, title: '夕飯リスト' }

// 配列の展開 → 要素をコピーして末尾に追加（Level 6）
[...items, newItem]
// → ['りんご', 'バナナ', 'みかん']
```

---

## 演習

**改造問題**

「キャンセル」ボタンを追加し、押したら `draft` を `saved.title` の値に戻す。  
（編集中の変更を取り消して、保存済みの状態に戻す）

**改造後のコード例：**

```tsx
const handleCancel = () => {
  setDraft(saved.title);
};

// JSX に追加
<button onClick={handleCancel}>キャンセル</button>
```


