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

# TypeScript(Obsidian Plugin)のお勉強
クイックスタート
https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin
リファレンス
https://docs.obsidian.md/Reference/TypeScript+API/Reference

# 雛形のmain.tsを読み解く
```
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}
```
importで読み込まれているApp, EditorといったアイテムはobsidianプラグインのSDKのツールセットという認識でよい
iterfaceとconstのブロックで行われているのはプラグインの設定データをどう扱うか決めている。
```
interface MyPluginSettings{
	mySetting: string;mySetting: string;
}
```
これは「データの設計図（型定義）」でTypeScript特有の機能。翻訳するとMyPluginSettingsという名前のルールを作りこのルールにはmySettingという項目が必要で中身は必ず文字列型でなければならない...と。
constのブロックでは、
```
const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'mySetting: 'default'
}
```
データの初期値を決めている。ユーザが初めてプラグインを入れた時など設定ファイルがまだ存在していない時に使われるデフォルトの値を用意してる。
`: MyPluginSettings = {}`の中身が重要で、この定数(const DEFAULT_SETTINGS)はさっき決めたMyPluginSettingという設計図のルールに従うと宣言してる。
翻訳するとDEFAULT_SETTINGSという箱を作り中身はmySettingは`default`という文字だお。

# プラグインの心臓部
```
export default class MyPlugin extends Plugin {
    settings: MyPluginSettings;

    async onload() {
        await this.loadSettings();

        // This creates an icon in the left ribbon.
        const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (_evt: MouseEvent) => {

            // Called when the user clicks the icon.
            new Notice('This is a notice!');

        });
```
### async/awaitの関係
asyncは非同期処理の宣言。非同期とは「相手の反応を待たずに進む」という意味
awaitはその逆で「あえて結果が出るまで待つ」
例を示そう
`async onload(){`で時間のかかる処理を含んでいるよと宣言
`await this.loadSettings();`↑の処理が終わるまでココで待つ
散見される`this`についてはPythonで言うところの`self`。
```
// 13行目: MyPluginというクラスを作ります。Pluginという公式の設計図を継承(extends)します。
export default class MyPlugin extends Plugin {
    // 14行目: このプラグインは「settings」という持ち物を持ちます。中身のルールはMyPluginSettingsです。
    settings: MyPluginSettings;

    // 16行目: プラグインが読み込まれた時に実行される関数です（時間のかかる処理を含みます）。
    async onload() {
        // 17行目: 設定データをロードします。「読み込み完了を待って(await)」から次に進みます。
        await this.loadSettings();

        // 20行目: 左側のリボン（サイドバー）にアイコンを追加します。
        // 'dice' はサイコロのアイコン、'Sample Plugin' はマウスホバー時の文字です。
        const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (_evt: MouseEvent) => {
            
            // 23行目: アイコンがクリックされたら、「This is a notice!」という通知を出します。
            new Notice('This is a notice!');
            
        });
```
addClassでクラスを追加する。ここでいうクラスはCSSスタイリングのこと
`ribbonIconEl.addClass('my-plugin-ribbon-class');`
## obsidianプラグインの心臓部
```
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, _view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});
```
どことなく見覚えがががが
sampleModelのインスタンスを作成し即座に.open()して画面に表示させている。
callbackは基本的なタイプで、コマンドパレットからこのコマンドが選ばれたら無条件で実行するということを表している。
ここまでは見ただけで理解できるがその下のeditorcallbackについては？である
editorCallbackで表されるaddCommandはエディタを開いているときにだけ使えるコマンドだそうで？マークは変わらずである
editorとは？obsidianが渡してくる現在アクティブなテキストエディタの操作盤だそう。おおちょっと分かってきた
例えば`editor.getSelection()`ではユーザがマスクしてるテキストを取ってくるようで（すげぇ
`editor.replaceSelection('Sample Editor Command')`ではマスクした箇所をSample Editor Commandで置き換えするのだそう。
あ、そうそうみんな大好き開発者モード、Obsidianもいけます！。ctrl+Shift+Iっす
話は戻りまして...なんとなく分かってきた。callbackと付く構文重要だわ
checkCallback...こいつは条件付きコマンドだ
コマンドパレットに表示するしないを制御している
checkingをよく見て。
**偵察モード (checking: true)**
        Obsidianが「ねえ、今このコマンドをメニューに表示してもいい？」と聞きに来た時です。
        この時、コードは実行せずに、「実行可能なら true」「不可能なら false」だけを返します。
        コード内では if (markdownView) で「今、Markdownの編集画面が開かれているか？」をチェックしています。開かれていれば true を返すので、コマンドパレットにこのコマンドが表示されます。
**実行モード (checking: false)**
        ユーザーが実際にコマンドをクリックした時です。
        if (!checking) のブロック内に入り、実際に new SampleModal... を実行します。

次いくぞー
```
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}
```
ここでいうフックとは
割り込みに近いかな。プログラムの動きを監視して割り込んで処理を突っ込む
グローバルDOMイベントとは
実際に例を見るのが良さげ
ユーザーがObsidianのウィンドウサイズを変えた (resize)
ユーザーが画面のどこかをクリックした (click)
ユーザーがキーボードを叩いた (keydown)
覚えるべき箇所はregisterかな
registerがついてたらプラグインが無効化されたらコイツも道連れねってこと


