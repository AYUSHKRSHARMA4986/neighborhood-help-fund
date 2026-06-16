import React, { useState } from "react";
import Wallet from "./components/Wallet";
import Balance from "./components/Balance";
import SendXLM from "./components/SendXLM";

const App: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);

  return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h1>🏘️ Neighborhood Help Fund (Testnet)</h1>
          <p>White Belt Level 1 Submission</p>
        </header>

        <main style={styles.main}>
          <Wallet setGlobalPublicKey={setPublicKey} />

          {publicKey && (
              <div style={styles.dashboard}>
                <div style={styles.card}>
                  <h2>💰 Account Balance</h2>
                  <Balance publicKey={publicKey} />
                </div>

                <div style={styles.card}>
                  <h2>💸 Send Support (XLM)</h2>
                  <SendXLM senderKey={publicKey} />
                </div>
              </div>
          )}
        </main>
      </div>
  );
};

const styles = {
  container: { padding: "40px 20px", maxWidth: "800px", margin: "0 auto" },
  header: { textAlign: "center" as const, marginBottom: "40px" },
  title: { fontSize: "2.5rem", color: "#0f172a", margin: "0 0 10px 0" },
  subtitle: { color: "#64748b", fontSize: "1.1rem", margin: "0" },
  main: { display: "flex", flexDirection: "column" as const, gap: "24px" },
  dashboard: { display: "flex", flexDirection: "column" as const, gap: "24px" },
  card: { background: "#ffffff", padding: "30px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", border: "1px solid #f1f5f9" },
  placeholderText: { color: "#94a3b8", fontStyle: "italic" }
};

export default App;