# Overview
colomoa-dashboardはObsidianに特別なダッシュボードを追加するためのDockerコンテナです。

フロントエンド：React|TypeScript|Node.js?|HTML/CSS  
バックエンド：Docker|Nginx|Python?  
![Download ZIP](https://img.shields.io/badge/Download-ZIP-blue.svg)
![Download ZIP](https://img.shields.io/badge/Download-ZIP-blue.svg)
![Download ZIP](https://img.shields.io/badge/Download-ZIP-blue.svg)
Dockerコンテナ化されたNginxサーバーでダッシュボードとなるWebサイトをローカルホストしObsidianプラグインでObsidianの起動画面に設定します。この仕様のためデーモン化を推奨します。

**依存関係：Obsidianプラグイン**
これらは使用していなくても良いですがcolomoa-dashboardの用途上導入が推奨されます。
- Homepage：起動画面にページを指定するため
- Custom Frames：WebページをObsidianで扱うため
- Google Drive Sync：Obsidian保管庫の同期のため

# Features
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
