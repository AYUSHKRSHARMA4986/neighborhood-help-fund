import React, { useState } from "react";
import { requestAccess, isConnected } from "@stellar/freighter-api";

interface WalletProps {
    setGlobalPublicKey: (key: string | null) => void;
}

const Wallet: React.FC<WalletProps> = ({ setGlobalPublicKey }) => {
    const [localKey, setLocalKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const connectWallet = async () => {
        setError(null);
        try {
            // FIX 1: isConnected now returns an object { isConnected: boolean, error?: ... }
            const connectionStatus = await isConnected();
            if (!connectionStatus.isConnected) {
                setError("Freighter wallet is not installed or locked.");
                return;
            }

            // FIX 2: requestAccess now returns an object { address: string, error?: ... }
            const accessResult = await requestAccess();

            if (accessResult.error) {
                setError(accessResult.error.message || "User denied access to wallet.");
                return;
            }

            // Only set the state if we successfully pulled the address string
            if (accessResult.address) {
                setLocalKey(accessResult.address);
                setGlobalPublicKey(accessResult.address);
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
            console.error("Wallet connection failed:", err);
        }
    };

    const disconnectWallet = () => {
        setLocalKey(null);
        setGlobalPublicKey(null);
        setError(null);
    };

    return (
        <div style={styles.card}>
            <h2>🔌 Wallet Connection</h2>
            {localKey ? (
                <div>
                    <p style={{ color: "green", fontWeight: "bold" }}>✔ Wallet connected</p>
                    <p style={styles.pubKey}>
                        {localKey.substring(0, 5)}...{localKey.substring(51)}
                    </p>
                    <button onClick={disconnectWallet} style={styles.disconnectBtn}>Disconnect</button>
                </div>
            ) : (
                <button onClick={connectWallet} style={styles.connectBtn}>Connect Freighter Wallet</button>
            )}
            {error && <p style={{ color: "red", marginTop: "10px" }}>❌ {error}</p>}
        </div>
    );
};

const styles = {
    card: { background: "#ffffff", padding: "30px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", maxWidth: "500px", margin: "0 auto", textAlign: "center" as const, border: "1px solid #f1f5f9" },
    connectBtn: { backgroundColor: "#3b82f6", color: "#fff", padding: "14px 28px", borderRadius: "8px", cursor: "pointer", border: "none", fontSize: "16px", fontWeight: "600", width: "100%" },
    disconnectBtn: { backgroundColor: "#ef4444", color: "#fff", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", border: "none", fontWeight: "600" },
    pubKey: { backgroundColor: "#f8fafc", padding: "12px", borderRadius: "8px", fontFamily: "monospace", color: "#475569", border: "1px solid #e2e8f0", margin: "15px 0" }
};
export default Wallet;