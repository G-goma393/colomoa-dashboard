# TypeScriptで作られた一般的なプロジェクトのフォルダ構造の例
colomoa-dashboard/
├── public/              # 変更せずそのまま配信される静的ファイル（favicon, test-feed.xmlなど）
├── src/                 # ソースコードの親玉
│   ├── assets/          # 画像やGlobalなCSSファイル
│   ├── components/      # UI部品（ボタン、リスト、ウィジェットなど）
│   ├── hooks/           # アプリケーションロジック（React Hooks）
│   ├── types/           # TypeScriptの型定義ファイル（interfaceなど）
│   ├── utils/           # ロジックのみの便利関数（日付フォーマット、計算など）
│   ├── App.tsx          # アプリの構成図（レイアウトの親）
│   ├── main.tsx         # ReactをHTMLに埋め込むエントリーポイント
│   └── vite-env.d.ts    # Viteの型定義
├── index.html           # 唯一のHTMLファイル（Reactがここに注入される）
├── package.json         # ライブラリ管理
├── tsconfig.json        # TypeScriptの設定
└── vite.config.ts       # ビルドツールの設定

## components/の規模が大きくなると以下のような組分けがされる。
components/ui/: ボタン、入力欄など、どこでも使う小さな部品（Atomic DesignでいうAtoms）
components/features/: RSSリーダー、ToDoリストなど、機能を持った大きな部品

## components/とhooks/に配置するファイルの例
hooks/useRss.ts: RSSデータを取ってくる係（裏方）
components/RssReader.tsx: 取ってきたデータを表示する係（表方）

## ちょっとした疑問
Q.拡張子の".ts"と".tsx"の違い
A.HTMLタグを含むかどうかの違いでReactコンポーネントは".tsx"が必要になるので基本的には".tsx"を使うことになる。
