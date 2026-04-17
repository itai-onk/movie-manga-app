export default async function handler(req, res) {
  const body = JSON.parse(req.body || "{}");
  const title = body.title || "";

  const prompt = `
映画タイトル: ${title}

この映画のジャンルを推定し、
SNS向け漫画プロンプトを作成してください。

条件：
・4ページ以内
・1ページ6コマ以内
・セリフ短め
・スマホ向け
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

  res.json({
    text: data.output?.[0]?.content?.[0]?.text || "エラー",
  });
}
