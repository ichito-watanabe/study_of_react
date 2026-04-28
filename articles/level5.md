# Level 5 : 子から親に関数を呼び返す流れを読む

**テーマ：** 子コンポーネントのボタンが押されたとき、親の関数を呼び出す。

---

## コード（2ファイル構成）

**App.tsx**

```tsx
import { useState } from 'react';
import ResetButton from './ResetButton';

function App() {
  const [count, setCount] = useState(10);
  const [message, setMessage] = useState('');

  const handleReset = () => {
    setCount(0);
    setMessage('リセットしました');
  };

  return (
    <div>
      <p>カウント：{count}</p>
      <ResetButton onReset={handleReset} />
      <p>{message}</p>
    </div>
  );
}

export default App;
```

**ResetButton.tsx**

```tsx
type Props = {
  onReset: () => void;
};

function ResetButton({ onReset }: Props) {
  return <button onClick={onReset}>リセットボタン</button>;
}

export default ResetButton;
```

---

## 問題

1. `handleReset` はどのファイルに書かれているか？
2. `ResetButton` のボタンを押したとき、実際に実行されるのはどの関数か？
3. `onReset: () => void` の `void` は何を意味するか？
4. `count` と `message` の初期値はそれぞれ何か？
5. ボタンを押した後、画面にはどう表示されるか？

---

## 解答

1. **App.tsx**
2. **App.tsx の `handleReset`**（`onReset` という名前で渡された同じ関数）
3. **戻り値なし**（この関数は何も返さない、という意味）
4. **`count` は `10`、`message` は `''`（空文字）**
5. **「カウント：0」と「リセットしました」が表示される**

---

## 解説

「関数を props で渡す」流れ：

```
App（親）
  handleReset という関数を定義
    ↓ onReset という名前で props として渡す
ResetButton（子）
  onReset を受け取る
  ボタンが押されたら onReset() を呼ぶ
    ↓ 実体は handleReset なので
App の handleReset が実行される
  → setCount(0), setMessage('リセットしました')
```

**`onReset={handleReset}` と `onClick={onReset}` の違いに注意：**

```tsx
// App 側：関数を渡している（() をつけない）
<ResetButton onReset={handleReset} />

// ResetButton 側：受け取った関数をボタンのクリックに結びつける
<button onClick={onReset}>
```

- `handleReset` → 「この関数を渡す」
- `handleReset()` → 「今すぐ実行する」

---

## 演習

**ステップ1：写経**

2つのファイルをそのまま打ち込んでください：

- `exercises/level5/App.tsx`
- `exercises/level5/ResetButton.tsx`

**ステップ2：改造問題**

以下の条件を満たすよう改造してください：

1. リセット後のメッセージを `'リセットしました'` から **`'カウントをゼロに戻しました'`** に変えてください
2. `ResetButton` に **`label` という props を新しく追加**してください  
   - ボタンに表示するテキスト（今は「リセットボタン」と固定されている）を、App 側から渡せるようにする  
   - App 側では `label="ゼロに戻す"` と渡してください

---

**改造後のコード例：**

**App.tsx**

```tsx
import { useState } from 'react';
import ResetButton from './ResetButton';

function App() {
  const [count, setCount] = useState(10);
  const [message, setMessage] = useState('');

  const handleReset = () => {
    setCount(0);
    setMessage('カウントをゼロに戻しました');
  };

  return (
    <div>
      <p>カウント：{count}</p>
      <ResetButton onReset={handleReset} label="ゼロに戻す" />
      <p>{message}</p>
    </div>
  );
}

export default App;
```

**ResetButton.tsx**

```tsx
type Props = {
  onReset: () => void;
  label: string;
};

function ResetButton({ onReset, label }: Props) {
  return <button onClick={onReset}>{label}</button>;
}

export default ResetButton;
```
