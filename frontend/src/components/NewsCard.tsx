import { NewsItem } from "../types";

interface Props {
  item: NewsItem;
}

export const NewsCard = ({ item }: Props) => {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card" // 後でCSSで定義
    >
      <div className="card-title">{item.title}</div>
      <div className="card-date">
        {new Date(item.published).toLocaleDateString()}
      </div>
    </a>
  );
};
