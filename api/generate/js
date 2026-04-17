export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const title = body?.title || "";

    if (!title) {
      return res.status(400).json({ error: "タイトルが空です" });
    }

    const prompt = `
映画タイトル: ${title}

この映画のジャンルを推定し、
SNS向けの漫画プロンプトを日本語で作成してください。

条件：
・4ページ以内
・1ページ6コマ以内
・セリフ短め
・スマホ向け
・ネタバレしすぎない
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt,
      }),
    });

    const data = await response.json();

    return res.status(200).json({
      text:
        data.output?.[0]?.content?.[0]?.text ||
        data.output_text ||
        "結果を取得できませんでした",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "サーバーエラー",
    });
  }
}
