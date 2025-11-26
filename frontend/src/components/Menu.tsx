import { SourceId, SourceOption } from "../types";

interface Props {
  currentSource: SourceId;
  onSelect: (id: SourceId) => void;
}

const SOURCES: SourceOption[] = [
  { id: "zenn", label: "Zenn" },
  { id: "gigazine", label: "Gigazine" },
  { id: "arch", label: "Arch Linux" },
];

export const Menu = ({ currentSource, onSelect }: Props) => {
  return (
    <div className="menu-container">
      {SOURCES.map((source) => (
        <button
          key={source.id}
          onClick={() => onSelect(source.id)}
          className={`menu-btn ${currentSource === source.id ? "active" : ""}`}
        >
          {source.label}
        </button>
      ))}

      {/* デイリーノートボタン（固定機能） */}
      <button
        className="menu-btn daily-note"
        onClick={() =>
          window.open("obsidian://advanced-uri?commandid=daily-notes")
        }
      >
        📝 Daily Note
      </button>
    </div>
  );
};
