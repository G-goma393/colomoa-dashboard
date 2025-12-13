import { ItemView, WorkspaceLeaf } from "obsidian";
import { createRoot, Root } from "react-dom/client";
import * as React from "react";
// Swiperのコンポーネントをインポート
import { Swiper, SwiperSlide } from "swiper/react";
// Swiperの必要なモジュール（機能）をインポート
import { Pagination, Mousewheel, EffectCube } from "swiper/modules";

// ※注意: 本来はここでCSSをimportしたいですが、Obsidianプラグインのビルド設定によっては
// エラーになるため、一旦コメントアウトまたは除外して進めます（後述）。
// import 'swiper/css';
// import 'swiper/css/pagination';

export const DASHBOARD_VIEW_TYPE = "dashboard-view";

export class DashboardView extends ItemView {
	root: Root | null = null;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return DASHBOARD_VIEW_TYPE;
	}

	getDisplayText() {
		return "Dashboard";
	}

	async onOpen() {
		this.contentEl.addClass("dashboard-view");
		this.root = createRoot(this.contentEl);

		this.root.render(
			<div
				className="dashboard-container"
				style={{ width: "100%", height: "100%" }}
			>
				<Swiper
					// EffectCube をモジュールリストに追加
					modules={[Pagination, Mousewheel, EffectCube]}
					effect={"cube"} // エフェクトの種類を 'cube' に指定
					grabCursor={true} // マウスカーソルを掴むアイコンにする
					// Cubeの詳細設定
					cubeEffect={{
						shadow: true, // 影を表示するか
						slideShadows: true, // スライドごとの影を表示するか
						shadowOffset: 20, // 影の距離
						shadowScale: 0.94, // 影の大きさ
					}}
					// ★重要: Cubeの時は必ず 1 にする
					slidesPerView={1}
					// 縦回転（vertical）か横回転（horizontal）か選べます。
					// 立方体っぽさを出すなら、まずは 'horizontal' がわかりやすいかもしれません。
					// もちろん 'vertical' でも縦に転がるサイコロのように動きます。
					direction={"vertical"}
					mousewheel={true}
					pagination={{ clickable: true }}
					style={{ width: "100%", height: "100%" }}
				>
					{/* ... (SwiperSlideの中身はそのまま) ... */}
					{/* 1枚目：ToDoリスト */}
					<SwiperSlide className="slide-item">
						<div className="card">
							<h2>📝 ToDo List</h2>
							<p>タスク管理画面</p>
							<p>なんでぇええ</p>
						</div>
					</SwiperSlide>

					{/* 2枚目：メインダッシュボード */}
					<SwiperSlide className="slide-item">
						<div className="card">
							<h2>🚀 Main Dashboard</h2>
							<p>メイン機能</p>
						</div>
					</SwiperSlide>

					{/* 3枚目：天気予報 */}
					<SwiperSlide className="slide-item">
						<div className="card">
							<h2>⛅ Weather</h2>
							<p>天気予報</p>
						</div>
					</SwiperSlide>

					{/* 4枚目：おまけ（立方体感を出すためにもう一面あると楽しいです） */}
					<SwiperSlide className="slide-item">
						<div className="card">
							<h2>⚙️ Settings</h2>
							<p>設定画面</p>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>,
		);
	}

	async onClose() {
		this.root?.unmount();
	}
}
