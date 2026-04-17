export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const title = body?.title || "";

    if (!title) {
      return res.status(200).json({ text: "映画タイトルを入力してください" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `映画タイトル「${title}」のジャンルを推定し、SNS向け漫画プロンプト案を日本語で短く作ってください。`
      })
    });

    const data = await response.json();

    return res.status(200).json({
      text:
        data.output?.[0]?.content?.[0]?.text ||
        data.output_text ||
        "結果を取得できませんでした"
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "サーバーエラー"
    });
  }
}
