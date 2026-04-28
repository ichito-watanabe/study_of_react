# Level 3 : button と onClick の流れを読む

**テーマ：** ボタンが押されたとき何が起きるかを、関数の動きで追う。

---

## コード

```tsx
import { useState } from 'react';

function TodoForm() {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (text === '') return;
    setSubmitted(true);
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>送信</button>
      {submitted && <p>「{text}」を送信しました</p>}
    </div>
  );
}
```

---

## 問題

1. `useState` が2つある。それぞれ何を管理しているか？
2. `handleSubmit` はいつ呼ばれるか？
3. `if (text === '') return;` は何をしているか？
4. 入力欄が空のまま「送信」を押したとき、`submitted` の値はどうなるか？
5. `<p>「{text}」を送信しました</p>` が表示される条件は何か？

---

## 解答

1. **`text`：入力中のテキスト、`submitted`：送信済みかどうか（true/false）**
2. **送信ボタンをクリックしたとき**
3. **`text` が空文字だったら関数をそこで止める**（以降の `setSubmitted(true)` が実行されなくなる）
4. **`false` のまま変わらない**（`return` で止まるため）
5. **`submitted` が `true` のとき**

---

## 解説

`return` を使った早期終了（ガード節）：

```tsx
const handleSubmit = () => {
  if (text === '') return;  // ここで止まる → 以降は実行されない
  setSubmitted(true);       // text が空でないときだけ実行される
};
```

---

## 演習

**ステップ1：写経**

上のコードをそのまま `exercises/level3/TodoForm.tsx` に打ち込んで、動作を確認してください。

**ステップ2：バグ修正問題**

このコードには**バグ**があります。次の手順で再現できます：

1. 入力欄に「テスト」と入力する
2. 「送信」ボタンを押す → 「「テスト」を送信しました」が表示される
3. 入力欄を**空に消す**
4. 「「テスト」を送信しました」が**表示されたまま消えない** ← バグ

**修正条件：**

入力欄を空にしたら、「〇〇を送信しました」のメッセージも**消えるよう**に修正してください。

---

**修正後のコード例：**

```tsx
import { useState } from 'react';

function TodoForm() {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (text === '') return;
    setSubmitted(true);
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => { setText(e.target.value); setSubmitted(false); }}
      />
      <button onClick={handleSubmit}>送信</button>
      {submitted && <p>「{text}」を送信しました</p>}
    </div>
  );
}

export default TodoForm;
```

**よくある間違い：**

```tsx
// NG: onChange を2つ書いても後の1つしか効かない
<input
  onChange={(e) => setText(e.target.value)}
  onChange={(e) => setSubmitted(false)}
/>

// OK: 1つの onChange の中に両方書く
<input
  onChange={(e) => { setText(e.target.value); setSubmitted(false); }}
/>
```
