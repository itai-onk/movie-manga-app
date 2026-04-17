import { useState } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);
      setResult("");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();
      setResult(data.text || data.error || "結果なし");
    } catch (e) {
      setResult("エラーが起きました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>映画→漫画プロンプト生成</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="映画タイトル"
        style={{ padding: 8, width: "70%", maxWidth: 320 }}
      />

      <button
        onClick={generate}
        style={{ marginLeft: 8, padding: "8px 12px" }}
      >
        {loading ? "生成中..." : "生成"}
      </button>

      <pre style={{ whiteSpace: "pre-wrap", marginTop: 20 }}>
        {result}
      </pre>
    </div>
  );
}
