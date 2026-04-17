import { useState } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");

  const generate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    const data = await res.json();
    setResult(data.text);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>映画→漫画プロンプト生成</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="映画タイトル"
      />

      <button onClick={generate}>生成</button>

      <pre>{result}</pre>
    </div>
  );
}
