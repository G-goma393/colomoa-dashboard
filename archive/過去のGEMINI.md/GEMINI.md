# はじめに
こんにちは、見てくれてありがとう。このファイルはAIエージェント向けにcolomoa-dashboardプロジェクトのアーキテクチャや目的、進捗といった全体像を書き留めておく文書ファイルです。  
## 自己紹介
gomaといいます。趣味はゲームと個人開発です。私の開発経験はその場その時作りたいものを作る...です。そのため時にはESP32とセンサ基盤で家族や友人にいたずらしたりRaspiクラスターを作り出してはVOICEVOX coreとChatGPT APIでチャットボットを作ったりMinecraftのModサーバーを運営管理したりそれ用のModpackを作ったりFPSクランのホームページを作成したり学校のオンライン掲示板を使いやすくしたDiscord Botを開発したりと...etc、一貫性が微塵もありません。最近はソフトウェア開発とWeb制作に興味を持っていてyt-dlpのGUIツールをTKinterで作ったりファイル操作の自動化のためのマルチプラットフォーム対応のスタンドアロンアプリをJavaFXで作ったりしています。colomoa-dashboardはWeb制作関連です。そんな私のよく使う開発言語は習熟度順にPython/Javascript/HTML/CSS/Java/Arduino/C/C++/。
### 開発環境
デスクトップとのノートパソコンの２台での開発がメイン。どちらもWindows11 homeとArch LinuxのCachyOSと別々の物理ディスクでデュアルブートしてる。  
Shellにはfish 4.2.1。デスクトップにはKDE Plasma 6.5.3。よく分かってないけどWMにはKWin(Wayland)。パッケージマネージャにはpacmanとyay。ここまではデスクトップとノートパソコンどちらも同じ。  

# 目的
> Q.んで、何をするの？  
A.イカしたダッシュボードを作る  

タスク管理やナレッジベースにNotionを使ってたんだけど大規模障害にあってソーシャルアプリの弱点が露呈したことを受けてオフライン動作が特徴のObsidianに移行した。それからしばらく経ってObsidianに慣れてきたところでダッシュボードを機能面とデザイン面でアップデートしようと思って...   
**Webページを作ってDockerコンテナ上のローカルNginxサーバーでホストしよう**  
これが今回のメイン目標。
# 要件定義
> シングルページアプリケーションを作ってDockerコンテナ上のローカルNginxサーバーでホストしよう

詳細をば。といっても仕様変更には寛容だよ。柔軟にやんなきゃ  
## 要件
- インターネット接続のないローカル環境で動作する
- Arch Linux, Windows11で動作可能なこと
- URIでObsidianにリダイレクトできる機能を兼ね備えること（↑と競合する可能性が微レ存、その場合リダイレクト機能を優先）
- ダッシュボードの機能すべてをシングルページで補う（例外あり）
- Obsidianを起動して最初の画面をダッシュボードに設定
- リマインド通知が可能
- 上記すべてをデーモン化、ユーザーはパソコンの電源をつけてobsidianを開くだけ
## 機能詳細
colomoa-dashboardの機能の全容です。  
**ToDoリスト機能**
シンプルにタスクを一列で配置するタブが一つ。[未着手|進行中|完了]で管理しプロジェクト単位で新規追加や削除ができるタブ。リストは何らかのファイル形式でローカルサーバーに保存されユーザがObsidian保管庫への絶対パスを設定すればPush時にファイルがコピーされ別端末間の同期がとれる。
**RSSリーダー機能**
１つRSSフィードにつき１つのタブで表示されるRSSリーダー。RSSフィードはユーザが設定可能。将来的にはAIのAPIと連携して記事の要約機能を追加したい。
**システムモニター機能**
CPU使用率・Memory使用量・GPU使用率・Disk使用率を表示
**天気API連携**
ユーザが設定した座標の一日天気を表示
**デイリーノート作成機能**
ObsidianリダイレクトURIで動作する機能の一つ
**Google Drive Syncプラグイン連携**
ObsidianリダイレクトURIで動作する機能の一つでpushとpullコマンド両方を兼ね備えている
**その他**
タスク管理データベースにはタスクに期限が設定できこれによりDiscord Webhookによってリマインド通知ができる。他にはローカルに置いた画像を表示したり将来的にはプレイリストを再生する機能を追加したい。

## 使用技術（想定）
フロントエンド：React|TypeScript|Node.js?|HTML/CSS  
バックエンド：Docker|Nginx|Python?  
  
**Obsidianプラグイン**  
- Homepage：起動画面にページを指定するため
- Custom Frames：WebページをObsidianで扱うため

# アーキテクチャ
## フロントエンド
- React + Typescript
- Swiper.js


## バックエンド
- Docker
- Nginx
- Node.js
### データ構造のスキーマ
{uuid}{title}{isDone}{dueTime}{updatedAt}{isNotified}{isDeleted}  
項目名,変数名(例),型,備考  
UUID,uuid,String,主キー。これを使って検索・比較する。  
タスク名,title,String,  
完了フラグ,isDone,Boolean,TRUE / FALSE  
通知日時,dueTime,Number,UNIX Time (ミリ秒)。通知不要な場合は空欄or0  
更新日時,updatedAt,Number,UNIX Time (ミリ秒)。同期の判断基準。  
通知済フラグ,isNotified,Boolean,TRUE なら通知処理をスキップ。  
削除フラグ,isDeleted,Boolean,論理削除用。  

# 進捗計画
## フェーズ１：最小構成で概念検証
最低限の機能を実装し、最小構成で概念検証を行う。
- [ ] 環境構築　　：Docker + Nginxでローカルサーバーをホストする
- [ ] コンテンツ：React + Typescriptで構成されたシンプルなページをObsidianの起動画面に表示する
- [ ] コンテンツ：URIでObsidianへリダイレクトする
- [ ] コンテンツ：RSSフィードを取得、ページに表示する（外部APIは省く）。
- [ ] 環境構築　　：デーモン化の検証
  
## フェーズ２：フロントエンドの開発
viteのローカル開発サーバー(npm run dev)を利用しすべてのアプリケーションロジックとUIを完成させる。ちなみに3DCubeUI。
- [ ] 一面：ToDoリスト機能｜中央列
- [ ] 一面：各種設定用ポップアップ
- [ ] 一面：天気API連携｜右列
- [ ] 一面：Google Drive Syncプラグイン連携｜中央列右上
- [ ] 一面：デイリーノート作成機能｜左列
- [ ] 一面：画像表示機能｜左列・中央の背景・右列に二枚
- [ ] 一面：システムモニター機能｜右列右上
- [ ] 二面：RSSリーダー機能
- [ ] 三面：空白｜将来的に機能を追加するためのスペース
### フェーズ2.1: hello Swiper.js
Swiper.jsのドキュメントを片手にTypeScript+Reactでシンプルなページを作り土台を用意する。
【↓】Getting Started
https://swiperjs.com/get-started
【↓】API Doc
https://swiperjs.com/swiper-api
- [X] TypeScriptでhellowold
- [X] ↑にReactで装飾する
- [X] Swiper.jsを加え先程の機能を実装する
## フェーズ３：Docker化とホスティング
NginxサーバーでホストしDockerコンテナ化する。

# 気になっていること書き置き
## Obsidianプラグインでもいいんじゃないか？
確かにそうなんだよな。軽く調べたらObsidianプラグインもTypeScriptで作るみたいだし、それならやりたいことのほとんどができる。
