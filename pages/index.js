import React from "react";
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [player, setPlayer] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    setResult('');
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ player: player }),
      });

      const data = await response.json();
      setResult(data.result.replaceAll('\\n', '<br />'));
      setPlayer("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>

      <main className={styles.main}>
        <h3>Analyze Player</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="player"
            placeholder="Enter an player"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
          />
          <input type="submit" value="Generate Analysis" />
        </form>
        <div
         className={styles.result}
         dangerouslySetInnerHTML={{ __html: result }}
        />
      </main>
    </div>
  );
}
