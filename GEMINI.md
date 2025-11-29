# はじめに
こんにちは、見てくれてありがとう。このファイルはAIエージェント向けにcolomoa-dashboardプロジェクトの目的や進捗といった全体像を書き留めておく文書ファイルです。  
## 自己紹介
gomaといいます。趣味はゲームと個人開発です。私の開発経験はその場その時作りたいものを作る...です。そのため時にはESP32とセンサ基盤で家族や友人にいたずらしたりRaspiクラスターを作り出してはVOICEVOX coreとChatGPT APIでチャットボットを作ったりMinecraftのModサーバーを運営管理したりそれ用のModpackを作ったりFPSクランのホームページを作成したり学校のオンライン掲示板を使いやすくしたDiscord Botを開発したりと...etc、一貫性が微塵もありません。最近はソフトウェア開発とWeb制作に興味を持っていてyt-dlpのGUIツールをTKinterで作ったりファイル操作の自動化のためのマルチプラットフォーム対応のスタンドアロンアプリをJavaFXで作ったりしています。colomoa-dashboardはWeb制作に関連しています。そんな私のよく使う開発言語で絞ると習熟度順にPython/Javascript/HTML/CSS/Java/Arduino/C/C++/。
### 開発環境
デスクトップとのノートパソコンの２台での開発がメイン。どちらもWindows11 homeとArch LinuxのCachyOSと別々の物理ディスクでデュアルブートしてる。  
Shellにはfish 4.2.1。デスクトップにはKDE Plasma 6.5.3。よく分かってないけどWMにはKWin(Wayland)。パッケージマネージャにはpacmanとyay。これまではデスクトップとノートパソコンどちらも同じ。  
あとはCPUとかMemoryとかのハード情報になるけど全部書くの面倒だから(笑)省略。少なくともcolomoa-dashboardの開発や実用で問題になることはないと思う...たぶんきっとMybe~。

# 目的
> Q.んで、何をするの？  
> A.イカしたダッシュボードを作る  
タスク管理やナレッジベースにNotionを使ってたんだけど大規模障害にあってソーシャルアプリの弱点が露呈したことを受けてオフライン動作が特徴のObsidianに移行した。それからしばらく経ってObsidianに慣れてきたところでダッシュボードを機能面とデザイン面でアップデートしようと思って...   
**シングルページアプリケーションを作ってDockerコンテナ上のローカルNginxサーバーでホストしよう**  
これが今回のメイン目標。
# 要件定義
> シングルページアプリケーションを作ってDockerコンテナ上のローカルNginxサーバーでホストしよう
詳細をば。といっても仕様変更には寛容だよ。柔軟にやんなきゃ  
colomoa-dashboardで使われる予定の技術は以下のとおり
- React
- TypeScript
- Docker
- Nginx
## 要件
- ローカル環境で動作する
- マルチプラットフォーム対応であること(最低でもArch Linux, Windows11)
- URIでObsidianにリダイレクトできる機能を兼ね備えること（↑と競合する可能性が微レ存
- 特別なウィンドウで表示されたタブメニュー。それぞれのタブはRSSフィードを表示します。
- 指定された位置に指定されたサイズと番号名でresourcesフォルダに配置した画像を表示します。
- Obsidianのコマンドを実行可能。デイリーノートの作成やgoogle Drive Syncプラグインのpushコマンドなど。
- AI記事要約機能

## 機能詳細

### メニュー機能
ユーザが指定した保管庫のページリンクを表示
### RSSフィード機能
特別なウィンドウで表示されたタブメニュー。それぞれのタブはRSSフィードを表示します。
### 画像表示機能
指定された位置に指定されたサイズと番号名でresourcesフォルダに配置した画像を表示します。
### Obsidianとの連携
Obsidianのコマンドを実行可能。デイリーノートの作成やgoogle Drive Syncプラグインのpushコマンドなど。
### AI記事要約機能
Google AIのAPIと連携し、選択したRSS記事などの要約を表示する機能。
### システムモニタ
CPU、メモリ使用率などのシステム情報をリアルタイムで表示するウィジェット。
### 天気・時計ウィジェット
天気予報APIと連携した天気表示と、スタイリッシュな時計機能。
### Web Terminal (Gemini CLI連携)
obsidianのブラウザで動作するターミナル。Gemini CLIコンソールと同期し、コマンド操作を可能にする。
## ではどのように開発するか？

> フロントエンド刷新

HTML/CSS/JSからReact + TypeScriptへ完全移行。GUIフレームワークとしてReactを採用し、コンポーネントベースで開発。

  

> バックエンド強化

Python (Flask) を引き続き使用し、APIエンドポイントを拡充。

- AI要約API

- システム情報取得API (psutil等)

- Web Terminal用WebSocketサーバ

  

> インフラ

Docker構成を維持しつつ、Reactビルドプロセスを統合。

  

# 進捗計画

  

## 第一段階：基盤刷新 (Frontend Modernization)

- [x] Docker環境の構築 (Pythonバックエンド)

- [x] React + TypeScript プロジェクトの初期化

- [ ] 既存HTML/CSSのReactコンポーネント化

- [ ] Docker環境へのReactビルドプロセスの統合

  

## 第二段階：基本機能実装 (Core Widgets)

- [ ] 天気・時計ウィジェットの実装

- [ ] システムモニタの実装 (Pythonバックエンド + Reactフロントエンド)

- [ ] RSSフィード機能のReact化

  

## 第三段階：高度な機能 (Advanced Features)

- [ ] 外部APIを用いたAI記事要約機能の実装

- [ ] Web Terminal (Gemini CLI連携) の実装

  

## 第四段階：統合と仕上げ (Integration & Polish)

- [ ] Obsidian連携機能の実装

- [ ] ユーザー設定機能 (config.properties) の実装

- [ ] デザインのブラッシュアップ (アニメーション、テーマ)
