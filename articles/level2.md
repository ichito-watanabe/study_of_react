# Level 2 : input と onChange の流れを読む

**テーマ：** 入力欄の値がどこに入り、どう画面に反映されるかを読む。

---

## コード

```tsx
import { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>こんにちは、{name}さん</p>
    </div>
  );
}

export default NameForm;
```

---

## 問題

1. `name` の初期値は何か？
2. テキストボックスに「田中」と入力したとき、`name` の値は何になるか？
3. `e.target.value` とは何のことか？
4. `onChange` はいつ呼ばれるか？
5. `<p>こんにちは、{name}さん</p>` は「画面表示・入力処理・保存処理」のどれか？

---

## 解答

1. **`''`（空文字）**（「なし」ではなく「何も入っていない文字列」）
2. **`'田中'`**
3. **入力欄に今入っているテキスト**
4. **入力欄の内容が変わるたびに呼ばれる**（1文字打つたびに毎回）
5. **画面表示**

---

## 解説

`e`（イベントオブジェクト）の構造：

```
e
├── e.target              → 操作されたHTML要素（inputなど）
│   └── e.target.value    → その入力欄に今入っているテキスト
└── e.type                → "change"（イベントの種類）
```

入力の流れ：

```
テキスト入力
  → onChange 発火
    → setName(e.target.value)
      → name 更新
        → 画面再描画
```

---

## 演習

**ステップ1：写経**

上のコードをそのまま `exercises/level2/NameForm.tsx` に打ち込んで、動作を確認してください。

**ステップ2：改造問題**

以下の条件を満たすよう改造してください：

- 入力欄が**空のとき**、「こんにちは、〇〇さん」の文を**表示しない**ようにしてください  
  （何か文字が入力されたときだけ表示する）

---

**改造後のコード例：**

```tsx
import { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {name && <p>こんにちは、{name}さん</p>}
    </div>
  );
}

export default NameForm;
```

**ポイント：** `name && <p>...</p>`  
空文字 `''` はJavaScriptで「偽（false扱い）」なので、`name` が空なら右側は表示されない。  
何か文字が入っていれば「真（true扱い）」になり表示される。

**よくある間違い：**

```tsx
// NG: JSXの中でも変数は {} なしで書く
{{name}=!('') && <p>...</p>}

// OK
{name && <p>...</p>}
```
