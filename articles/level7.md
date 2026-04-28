# Level 7 : 保存処理の流れを読む

**テーマ：** ボタンを押したときのデータが「画面の一時データ」なのか「外に保存されるデータ」なのかを区別する。

---

## コード（1ファイル構成）

**App.tsx**

```tsx
import { useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (title === '') return;
    setSaving(true);

    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    setSaving(false);
    setSaved(true);
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSave} disabled={saving}>
        {saving ? '保存中…' : '保存'}
      </button>
      {saved && <p>保存しました</p>}
    </div>
  );
}

export default App;
```

---

## 問題

1. `saving` と `saved` はそれぞれ何を表しているか？
2. `handleSave` の中で `setSaving(true)` を呼んでいる。これは画面にどんな影響を与えるか？
3. `await fetch(...)` は何をしているか？「画面表示・入力処理・保存処理」のどれか？
4. `body: JSON.stringify({ title })` で送っている `title` は「本物のデータ」か「画面上の一時データ」か？
5. `disabled={saving}` は何をしているか？なぜこれが必要か？

---

## 解答

1. `saving`＝保存処理が進行中かどうか（true/false）、`saved`＝保存が完了したかどうか（true/false）
2. `saving=true` のとき「保存中…」、`saving=false` のとき「保存」が表示される
3. 保存処理。`/api/notes` に POST リクエストを送り、title をサーバーに保存する
4. `title` は useState の一時データだが、fetch で送ることでサーバーに保存された本物のデータになる
5. ボタンを無効化して保存中の二重送信を防ぐ

---

## 解説

---

## 演習

**ステップ1：写経**

`app/src/App.tsx` の中身を上のコードに書き換えて、動作を確認してください。  
（`fetch` は実際のAPIがないためエラーになりますが、それは想定内です）

**ステップ2：改造問題**

以下の条件を満たすよう改造してください：

1. 保存が完了したあと、**入力欄を空にする**（`title` を空文字に戻す）
2. `saved` が `true` のとき、**「保存」ボタンを `disabled` にして押せなくする**  
   （一度保存したら再送信できないようにする）

---

**改造後のコード例：**

**app/src/App.tsx**

```tsx
import { useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (title === '') return;
    setSaving(true);

    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    setSaving(false);
    setSaved(true);
    setTitle('');
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSave} disabled={saving || saved}>
        {saving ? '保存中…' : '保存'}
      </button>
      {saved && <p>保存しました</p>}
    </div>
  );
}

export default App;
```

- `setTitle('')` を `setSaved(true)` の直後に追加することで、保存後に入力欄が空になる
- `disabled={saving || saved}` で「保存中」または「保存済み」のどちらでもボタンが押せなくなる

**よくある間違い：**

```tsx
// NG: || true は常にtrueになるのでボタンが最初から永遠に押せない
disabled={saving || true}

// NG: } の閉じ忘れ
disabled={saving || saved>

// OK
disabled={saving || saved}>
```

**補足：`||` と `&&` の違い**

| 記号 | 意味 | 日本語 |
|------|------|--------|
| `\|\|` | OR | どちらかが true なら true |
| `&&` | AND | 両方 true のときだけ true |

