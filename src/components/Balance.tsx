import React, { useState, useEffect } from "react";
import { Horizon } from "@stellar/stellar-sdk";

// Connect to the Stellar Testnet server
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

interface BalanceProps {
    publicKey: string;
}

const Balance: React.FC<BalanceProps> = ({ publicKey }) => {
    const [balance, setBalance] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch account details from the Stellar network
                const account = await server.loadAccount(publicKey);

                // A Stellar account can hold many assets; we want the "native" XLM balance
                const nativeBalance = account.balances.find(
                    (b) => b.asset_type === "native"
                );

                if (nativeBalance) {
                    setBalance(nativeBalance.balance);
                } else {
                    setBalance("0.0000000");
                }
            } catch (err: any) {
                // Error 404 means the wallet exists in Freighter, but hasn't received its first testnet funds yet
                if (err.response?.status === 404) {
                    setError("Account not found. Please fund this wallet using the Stellar Testnet Faucet!");
                } else {
                    setError("Failed to fetch balance. Check your network connection.");
                }
                console.error("Balance fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (publicKey) {
            fetchBalance();
        }
    }, [publicKey]);

    return (
        <div style={styles.container}>
            {loading ? (
                <p style={{ color: "#888" }}>⏳ Fetching live balance...</p>
            ) : error ? (
                <p style={{ color: "#ff4d4f", fontWeight: "bold" }}>❌ {error}</p>
            ) : (
                <h3 style={styles.balanceText}>
                    {balance} <span style={styles.currency}>XLM</span>
                </h3>
            )}
        </div>
    );
};

const styles = {
    container: { textAlign: "center" as const, padding: "10px 0" },
    balanceText: { fontSize: "48px", margin: "10px 0", color: "#10b981", fontWeight: "800", letterSpacing: "-1px" },
    currency: { fontSize: "18px", color: "#64748b", fontWeight: "600", letterSpacing: "normal" }
};

export default Balance;