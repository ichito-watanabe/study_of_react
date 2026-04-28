# Level 4 : props で親から子に値が渡る流れを読む

**テーマ：** 親コンポーネントが持っている値を、子コンポーネントに渡して表示する。

---

## コード（2ファイル構成）

**App.tsx**

```tsx
import { useState } from 'react';
import Counter from './Counter';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Counter value={count} label={"現在のカウント"} />
      <button onClick={() => setCount(count + 1)}>増やす</button>
    </div>
  );
}
export default App;
```

**Counter.tsx**

```tsx
type Props = {
  value: number;
  label: string;
};

function Counter({ value, label }: Props) {
  return <p>{label} {value}</p>;
}

export default Counter;
```

---

## 問題

1. `count` はどのファイルで作られているか？
2. `Counter` コンポーネントは `value` と `label` をどこから受け取っているか？
3. `type Props` は何のために書くか？
4. ボタンを押したとき、何が起きるか順番に説明せよ。
5. `Counter` コンポーネントの中に `useState` はあるか？なぜか？

---

## 解答

1. **App.tsx**（`const [count, setCount] = useState(0)`）
2. **App.tsx から props として渡される**（`<Counter value={count} label={"現在のカウント"} />`）
3. **受け取る props の型を定義するため**（TypeScript で型チェックができる）
4. **`setCount(count + 1)` → `count` が増える → App が再描画 → Counter に新しい `value` が渡る → Counter も再描画**
5. **ない。Counter は表示するだけで、値の管理はすべて App が行っているから**

---

## 解説

props（プロパティ）は「親から子への一方通行の値渡し」。

```
App（親）
  count = 3
    ↓ props で渡す
Counter（子）
  value={3}, label={"現在のカウント"}
  → <p>現在のカウント 3</p> を表示
```

子コンポーネントは渡された値を **直接書き換えることができない**。  
値を変えたいときは必ず親の `setCount` を使う。

---

## 演習

**ステップ1：写経**

2つのファイルをそのまま打ち込んでください：

- `exercises/level4/App.tsx`
- `exercises/level4/Counter.tsx`

**ステップ2：改造問題**

以下の条件を満たすよう改造してください：

1. `label` の内容を `"現在のカウント"` から **`"クリック回数"`** に変えてください
2. 「増やす」ボタンに加えて、**「減らす」ボタンを追加**してください  
   （減らすボタンを押すと `count` が1ずつ減る。`setCount(count - 1)` を使う）

---

**改造後のコード例：**

**App.tsx**

```tsx
import { useState } from 'react';
import Counter from './Counter';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Counter value={count} label={"クリック回数"} />
      <button onClick={() => setCount(count + 1)}>増やす</button>
      <button onClick={() => setCount(count - 1)}>減らす</button>
    </div>
  );
}
export default App;
```

**Counter.tsx**（変更なし）

```tsx
type Props = {
  value: number;
  label: string;
};

function Counter({ value, label }: Props) {
  return <p>{label} {value}</p>;
}

export default Counter;
```
