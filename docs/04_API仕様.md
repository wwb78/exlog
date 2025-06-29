# 04\_API仕様：exlog（experience log）

## 🚀 概要

RESTful APIベースで、以下の3つの主要リソースに対応：

* 学習ログ（learning\_logs）
* カテゴリ（categories）
* ユーザーステータス（user\_stats）

すべてのエンドポイントはユーザー認証（トークンまたはセッション）を前提とし、`user_id` に基づいてスコープされたデータを返す。

---

## 📘 エンドポイント仕様

### 1. 学習ログ（/api/logs）

| メソッド   | パス               | 説明                       |
| ------ | ---------------- | ------------------------ |
| GET    | `/api/logs`      | ログ一覧の取得（フィルタ可、カテゴリ情報を含む） |
| POST   | `/api/logs`      | 新規ログの作成                  |
| GET    | `/api/logs/{id}` | 指定ログの取得（カテゴリ情報を含む）       |
| PUT    | `/api/logs/{id}` | 指定ログの更新                  |
| DELETE | `/api/logs/{id}` | 指定ログの削除                  |

#### 🔍 フィルタ例（GET /api/logs）

* `?category=xxx`
* `?date_from=YYYY-MM-DD&date_to=YYYY-MM-DD`
* `?keyword=xxx`

#### 📦 レスポンス例（GET /api/logs）

```json
[
  {
    "id": 1,
    "title": "ReactのHooks学習",
    "description": "useEffectとuseMemoを学んだ",
    "duration_minutes": 60,
    "learned_at": "2025-06-21",
    "category": {
      "id": 3,
      "name": "フロントエンド",
      "color": "#3399cc"
    }
  }
]
```

---

### 2. カテゴリ（/api/categories）

| メソッド   | パス                     | 説明        |
| ------ | ---------------------- | --------- |
| GET    | `/api/categories`      | カテゴリ一覧の取得 |
| POST   | `/api/categories`      | 新規カテゴリ作成  |
| PUT    | `/api/categories/{id}` | カテゴリ編集    |
| DELETE | `/api/categories/{id}` | カテゴリ削除    |

---

### 3. ユーザーステータス（/api/user-stats）

| メソッド | パス                | 説明             |
| ---- | ----------------- | -------------- |
| GET  | `/api/user-stats` | 現在のXP・レベル情報の取得 |

※ 将来的に POST/PUT で直接操作も可能にするが、現状はバックエンドで自動管理想定。

---

## 🔐 認証・認可

* 全エンドポイントは認証必須（例：JWT, セッションCookieなど）
* `user_id` はトークン/セッションから自動的に解決し、明示的に送信しない

---

## 🛠️ 今後の拡張案

* /api/tags （タグ機能）
* /api/goals （目標管理）
* /api/users/{id} （管理者向け）
