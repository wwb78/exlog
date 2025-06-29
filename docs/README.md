# AI駆動開発プロジェクト構成メモ

## 📌 開発方針

* AIと対話しながら、アイディア構築 → 設計 → 実装 → テストまで進める。
* 各工程で決定した内容はすべて Markdown で文書化。
* 文書化したファイルは次工程のインプットに利用し、反復的に開発を進める。
* フロントは Vite + React + TypeScript。
* バックエンドやDBはプロジェクトに応じて選択。
* Docker環境での開発・実行を前提とする。
* **汎用的で他プロジェクトにも転用可能な構成**を重視。

---

## 📁 ディレクトリ構成（ベース案）

```
your-project/
├── .github/              # GitHub ActionsなどCI/CD設定
├── .vscode/              # VSCode用の設定ファイル群
├── docker/               # 各サービスのDockerfile等
│   ├── frontend/
│   └── backend/
├── docs/                 # 仕様・要件などのAI対話成果物をMarkdownで管理
│   ├── 00_アイデア検討.md
│   ├── 01_要件定義.md
│   ├── 02_画面設計.md
│   ├── 03_DB設計.md
│   ├── 04_API仕様.md
│   └── README.md
├── frontend/             # Vite + React + TypeScript アプリ本体
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── types/
│   ├── .env
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── backend/              # 任意のバックエンド技術（Django, FastAPIなど）
│   └── ...
├── infra/                # Nginxなどのインフラ設定
│   └── nginx/
├── scripts/              # 初期化、ビルド、テストなどの補助スクリプト
│── docker-compose.yml
├── .env                  # 共通環境変数
├── .gitignore
├── README.md             # プロジェクト概要
└── LICENSE
```

---

## 🔄 ワークフロー例

1. `docs/00_アイデア検討.md` で構想や議論を整理
2. `01_要件定義.md` → `02_画面設計.md` → `03_DB設計.md` → `04_API仕様.md` へ段階的に展開
3. 設計文書をもとに `frontend/` や `backend/` を開発
4. `infra/` でDockerやCI/CD構成を管理
5. `scripts/` にて共通作業の自動化

---

## 📝 次回の指示に使えるメモ

このファイルをもとに次工程（仕様設計、画面設計、ER図作成、初期コード生成など）を進めてください。
