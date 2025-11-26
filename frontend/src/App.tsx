import { useState, useEffect } from "react";
import { Menu } from "./components/Menu";
import { NewsCard } from "./components/NewsCard";
import { NewsItem, SourceId } from "./types";
import "./App.css";

function App() {
  // 状態管理: 現在のソースと、記事リスト
  const [source, setSource] = useState<SourceId>("gigazine");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  // データ取得関数
  const fetchNews = async (target: SourceId) => {
    setLoading(true);
    try {
      // Proxy設定のおかげで /api でPythonに繋がる
      const res = await fetch(`/api/news?source=${target}`);
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  // sourceが変わるたびに再取得
  useEffect(() => {
    fetchNews(source);
  }, [source]);

  return (
    <div className="container">
      <Menu currentSource={source} onSelect={setSource} />

      <h2 className="section-title">{source.toUpperCase()}</h2>

      <div className="news-grid">
        {loading ? (
          <p>Loading...</p>
        ) : (
          news.map((item, index) => <NewsCard key={index} item={item} />)
        )}
      </div>
    </div>
  );
}

export default App;
