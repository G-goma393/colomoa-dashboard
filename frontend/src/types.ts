// RSS記事のデータの形
export interface NewsItem {
  title: string;
  link: string;
  published: string;
}

// ニュースソースのID（文字列を厳密に制限）
export type SourceId = "zenn" | "gigazine" | "arch";

// ニュースソースの情報
export interface SourceOption {
  id: SourceId;
  label: string;
}
