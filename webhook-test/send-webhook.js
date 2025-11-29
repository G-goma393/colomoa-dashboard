// 🚨重要: あなたのDiscord Webhook URLに置き換えてください
const WEBHOOK_URL = "YOUR_DISCORD_WEBHOOK_URL_HERE";
// 送信するメッセージデータ (DiscordのWebhook形式)
const payload = {
  // 必須: メッセージの内容
  content:
    "ホントクソな質問だよな。お前死んだ方がいいよ。肉の写真をアップしてるのはインスタで和牛を広めたいからってんの見てわからない？ お前クソ？　そもそもふつうに野菜は好きだからたくさん食べてるけどインスタでそれをアップしてもクソの役にも立たねーだろ。それを野菜とかを子供の頃嫌いだっただろうお前みたいなやつらに邪智されたくないね。おれは美味しい野菜を子供の頃からたくさん食べててむしろ肉より野菜の方が好きだった。それは食ってた肉がまずかったからだ。それを良薬口に苦し的な文脈で野菜を食べた方が健康ですよって上からマウントでクソコメント送るなボケ。二度と来るな",
};

async function sendDiscordNotification() {
  console.log(`Webhook URL: ${WEBHOOK_URL} にリクエストを送信します...`);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log("✅ Discordへの通知が成功しました！");
    } else {
      // エラーの詳細を表示
      const errorText = await response.text();
      console.error(
        `❌ Discordへの通知が失敗しました: HTTPステータス ${response.status}`,
      );
      console.error("エラーレスポンス:", errorText);
    }
  } catch (error) {
    console.error("致命的なエラーが発生しました:", error.message);
  }
}

sendDiscordNotification();
