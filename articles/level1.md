# Level 1 : useState を読む

**テーマ：** 値はどこで作られ、どこで変わり、どこで使われるか。

---

## コード

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>増やす</button>
    </div>
  );
}
```

---

## 問題

1. `count` の初期値はいくつか？
2. `count` の値はいつ変わるか？
3. `setCount` は何をするものか？
4. `<p>{count}</p>` は「画面表示・入力処理・保存処理」のどれか？
5. ボタンを3回押したら `count` はいくつになるか？

---

## 解答

1. **0**（`useState(0)` の `0` が初期値）
2. **ボタンをクリックしたとき**（`onClick` が呼ばれたとき）
3. **`count` の値を新しい値に書き換える関数（setter）**
4. **画面表示**（`count` の値をそのまま表示しているだけ）
5. **3**（0 → 1 → 2 → 3）

---

## 解説

`useState` は「値を覚えておく仕組み」。

```
const [count, setCount] = useState(0);
         ↑         ↑              ↑
      今の値    書き換える関数    初期値
```

- `count` を直接書き換えることはできない（`count = 1` はNG）
- 必ず `setCount(新しい値)` を使う
- `setCount` を呼ぶと画面が自動で再描画される

---

## 演習

**ステップ1：写経**

上のコードをそのまま `exercises/level1/Counter.tsx` に打ち込んで、動作を確認してください。

**ステップ2：改造問題**

以下の条件を満たすよう改造してください：

1. ボタンを押すと `count` が **1ずつではなく2ずつ増える**ようにしてください
2. `count` を **0に戻す「リセット」ボタン**を追加してください

---

**改造後のコード例：**

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 2)}>増やす</button>
      <button onClick={() => setCount(0)}>リセット</button>
    </div>
  );
}

export default Counter;
```

- `count + 1` → `count + 2` に変えることで2ずつ増える
- `setCount(0)` で0に戻す
