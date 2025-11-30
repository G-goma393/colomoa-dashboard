// src/App.tsx

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> jjjjjjadjiajdiajdiajdijadi
        </p>
      </div>

      {/* ▼▼▼ 追加部分 ▼▼▼ */}
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2>Obsidian Actions</h2>
        <a href="obsidian://daily" target="_blank" rel="noopener noreferrer">
          <button style={{ backgroundColor: "#7c3aed", color: "white" }}>
            Open Daily Note
          </button>
        </a>
        <p style={{ fontSize: "0.8em", marginTop: "10px" }}>
          ※うまく動かない場合は{" "}
          <code>obsidian://daily?vault=あなたの保管庫名</code>{" "}
          と指定してみてください
        </p>
      </div>
      {/* ▲▲▲ 追加部分 ▲▲▲ */}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
