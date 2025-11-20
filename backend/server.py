from flask import Flask, jsonify, request
import feedparser
from flask_cors import CORS # 必要なら pip install flask-cors

app = Flask(__name__, static_folder='.', static_url_path='')
# CORSを許可（localhost間なので基本緩めでOK）
# 実際は同一オリジンになるため不要な場合も多いですが念の為
CORS(app) 

# 登録したいRSSのリスト（辞書形式で管理）
RSS_FEEDS = {
    "zenn": "https://zenn.dev/feed",
    "gigazine": "https://gigazine.net/news/rss_2.0/",
}

@app.route('/')
def index():
    # ルートにアクセスされたらHTMLを返す
    return app.send_static_file('index.html')

@app.route('/api/news')
def get_news():
    target = request.args.get('source', 'zenn') # デフォルトはZenn
    url = RSS_FEEDS.get(target)
    
    if not url:
        return jsonify({"error": "Unknown source"}), 400

    feed = feedparser.parse(url)
    data = []
    
    # 上位5件を取得
    for entry in feed.entries[:5]:
        data.append({
            "title": entry.title,
            "link": entry.link,
            "published": entry.get("published", "") or entry.get("updated", "")
        })
        
    return jsonify(data)

if __name__ == '__main__':
    # 外部アクセス許可
    app.run(host='0.0.0.0', port=8888, debug=True)