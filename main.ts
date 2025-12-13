import { Plugin, WorkspaceLeaf } from "obsidian";
// 先ほど作ったViewをインポート
import { DashboardView, DASHBOARD_VIEW_TYPE } from "./DashboardView";

export default class MyPlugin extends Plugin {
	async onload() {
		// 1. Viewを登録する（Obsidianに「こういうViewがあるよ」と教える）
		this.registerView(
			DASHBOARD_VIEW_TYPE,
			(leaf) => new DashboardView(leaf),
		);

		// 2. リボンアイコンを追加（クリックで開く用）
		this.addRibbonIcon("layout-dashboard", "Open Dashboard", () => {
			this.activateView();
		});

		// 3. コマンドパレットに追加（コマンドで開く用）
		this.addCommand({
			id: "open-dashboard",
			name: "Open Dashboard",
			callback: () => {
				this.activateView();
			},
		});
	}

	// Viewを開くためのヘルパー関数
	async activateView() {
		const { workspace } = this.app;

		// すでに開かれているDashboardがあれば、それを閉じる（重複防止）
		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(DASHBOARD_VIEW_TYPE);

		if (leaves.length > 0) {
			// すでに開いていれば、そのタブをアクティブにするだけ
			leaf = leaves[0];
		} else {
			// 開いていなければ、新しいタブ（リーフ）を作成する
			// 'getLeaf(true)' は「新しい空のタブをくれ」という意味
			leaf = workspace.getLeaf(true);
			await leaf.setViewState({
				type: DASHBOARD_VIEW_TYPE,
				active: true,
			});
		}

		// そのタブを最前面に表示する
		workspace.revealLeaf(leaf);
	}
}
