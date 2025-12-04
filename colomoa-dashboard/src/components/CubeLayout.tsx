// src/components/CubeLayout.tsx
import { Swiper, SwiperSlide } from "swiper/react";
// 必要なモジュールをインポート
import { EffectCube, Pagination, Mousewheel } from "swiper/modules";

// スタイルシートのインポート
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// スタイルの定義（CSSファイルに分けてもOKですが、学習用にここに書きます）
const cubeContainerStyle: React.CSSProperties = {
  width: "80vmin", // 画面の短い辺の80%
  height: "80vmin", // 正方形にする
};

const slideStyle: React.CSSProperties = {
  backgroundColor: "#242424",
  border: "1px solid #444",
  borderRadius: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "2rem",
  boxShadow: "0 0 20px rgba(0,0,0,0.5)",
};

export const CubeLayout = () => {
  return (
    <Swiper
      // ▼▼▼ 縦回転の設定 ▼▼▼
      direction={"vertical"}
      effect={"cube"}
      grabCursor={true}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      mousewheel={true} // マウスホイールで回転できるようにする
      pagination={{ clickable: true }}
      modules={[EffectCube, Pagination, Mousewheel]}
      style={cubeContainerStyle}
    >
      {/* --- 1面：Hello World (Main Dashboard) --- */}
      <SwiperSlide style={slideStyle}>
        <div>
          <h1>Hello World!</h1>
          <p style={{ fontSize: "1rem" }}>Phase 2.1: TypeScript & React</p>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              background: "#333",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <input type="checkbox" style={{ transform: "scale(1.5)" }} />
            <span>タスク完了！</span>
          </label>
        </div>
      </SwiperSlide>

      {/* --- 2面：入れ子スライダー (Nested Swiper) --- */}
      <SwiperSlide style={{ ...slideStyle, backgroundColor: "#2f2f2f" }}>
        {/* 親へのイベント伝播を防ぐクラス "swiper-no-swiping" は必要に応じて使う */}
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", margin: 0, textAlign: "center" }}>
            Nested Swiper
          </h3>

          <Swiper
            direction={"horizontal"} // 子は横スライド
            pagination={{ clickable: true }}
            modules={[Pagination]}
            style={{
              width: "100%",
              height: "80%",
              marginTop: "10px",
              background: "#000",
            }}
          >
            <SwiperSlide
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Sub Slide 1
            </SwiperSlide>
            <SwiperSlide
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Sub Slide 2
            </SwiperSlide>
            <SwiperSlide
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Sub Slide 3
            </SwiperSlide>
          </Swiper>
        </div>
      </SwiperSlide>

      {/* --- 3面：天気とか --- */}
      <SwiperSlide style={{ ...slideStyle, backgroundColor: "#4a6fa5" }}>
        <div>Weather (TBD)</div>
      </SwiperSlide>

      {/* --- 4面：設定とか --- */}
      <SwiperSlide
        style={{ ...slideStyle, backgroundColor: "#e9c46a", color: "#333" }}
      >
        <div>Settings (TBD)</div>
      </SwiperSlide>
    </Swiper>
  );
};
