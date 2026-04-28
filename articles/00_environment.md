# 環境構築

## 必要なもの

- **Node.js**（v18以上推奨）
- **npm**（Node.jsに同梱）
- **VS Code**（エディタ）

---

## Node.js のインストール

1. [https://nodejs.org](https://nodejs.org) にアクセス
2. 「LTS（推奨版）」をダウンロードしてインストール
3. ターミナルで確認：

```bash
node -v   # v18.x.x などと表示されればOK
npm -v    # 9.x.x などと表示されればOK
```

---

## プロジェクト作成（Vite + React + TypeScript）

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

ブラウザで `http://localhost:5173` が開けば成功。

---

## ファイル構成（基本）

```
my-app/
├── src/
│   ├── App.tsx       ← メインのコンポーネント
│   ├── main.tsx      ← エントリーポイント（触らなくてOK）
│   └── components/   ← コンポーネントを追加していく場所
```

---

## コンポーネントを動かすには

`src/App.tsx` を書き換えて使う。  
`npm run dev` を起動したままにしておけば、ファイルを保存するたびにブラウザが自動更新される。
