import React, { useState } from "react";
import { Horizon, TransactionBuilder, Networks, Asset, Operation } from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";

const server = new Horizon.Server("https://horizon-testnet.stellar.org");

interface SendXLMProps {
    senderKey: string;
}

const SendXLM: React.FC<SendXLMProps> = ({ senderKey }) => {
    const [recipient, setRecipient] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [status, setStatus] = useState<string | null>(null);
    const [hash, setHash] = useState<string | null>(null);
    const [isSending, setIsSending] = useState<boolean>(false);

    const handleSend = async () => {
        setStatus(null);
        setHash(null);

        // Basic validation
        if (!recipient || !amount) {
            setStatus("❌ Please enter both a recipient address and an amount.");
            return;
        }

        setIsSending(true);
        setStatus("⏳ Building transaction...");

        try {
            // 1. Load the sender's account from the network
            const sourceAccount = await server.loadAccount(senderKey);

            // 2. Build the transaction
            // FIX: Changed Horizon.BASE_FEE to "100" (minimum fee in stroops)
            const transaction = new TransactionBuilder(sourceAccount, {
                fee: "100",
                networkPassphrase: Networks.TESTNET,
            })
                .addOperation(
                    Operation.payment({
                        destination: recipient,
                        asset: Asset.native(),
                        amount: amount,
                    })
                )
                .setTimeout(30)
                .build();

            // 3. Request Freighter to sign it
            setStatus("🔒 Waiting for Freighter signature...");
            const xdr = transaction.toXDR();

            // FIX: Changed 'network' to 'networkPassphrase'
            const signResult = await signTransaction(xdr, {
                networkPassphrase: Networks.TESTNET,
                address: senderKey
            });

            // Handle user rejection or extension errors
            if (signResult.error) {
                setStatus(`❌ Signing failed: ${signResult.error.message || "User denied signature."}`);
                setIsSending(false);
                return;
            }

            // 4. Submit the signed transaction to the Stellar network
            setStatus("🚀 Submitting to the network...");
            const txToSubmit = TransactionBuilder.fromXDR(
                signResult.signedTxXdr,
                Networks.TESTNET
            );

            const response = await server.submitTransaction(txToSubmit);

            // 5. Success! Show the hash.
            setStatus("✅ Transaction Successful!");
            setHash(response.hash);
            setRecipient("");
            setAmount("");

        } catch (error: any) {
            console.error("Transaction Error:", error);

            // Step 8 Rubric Requirement: Error Handling for specific blockchain failures
            if (error?.response?.data?.extras?.result_codes?.operations) {
                const opCode = error.response.data.extras.result_codes.operations[0];
                if (opCode === "op_no_destination") {
                    setStatus("❌ Recipient account does not exist on the network.");
                } else if (opCode === "op_underfunded") {
                    setStatus("❌ Insufficient balance to send this amount.");
                } else {
                    setStatus(`❌ Transaction failed: ${opCode}`);
                }
            } else {
                setStatus("❌ Transaction failed. Ensure the recipient address is valid.");
            }
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Recipient Address (G...)</label>
                <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="e.g., GDLBM..."
                    style={styles.input}
                    disabled={isSending}
                />
            </div>

            <div style={styles.inputGroup}>
                <label style={styles.label}>Amount (XLM)</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="10"
                    style={styles.input}
                    disabled={isSending}
                />
            </div>

            <button
                onClick={handleSend}
                disabled={isSending}
                style={isSending ? styles.buttonDisabled : styles.button}
            >
                {isSending ? "Processing..." : "Send XLM Support"}
            </button>

            {status && <p style={styles.status}>{status}</p>}

            {hash && (
                <div style={styles.hashBox}>
                    <p style={{ margin: "0 0 5px 0" }}><strong>Transaction Hash:</strong></p>
                    <a
                        href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.link}
                    >
                        {hash.substring(0, 10)}...{hash.substring(hash.length - 10)}
                    </a>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { display: "flex", flexDirection: "column" as const, gap: "20px" },
    inputGroup: { display: "flex", flexDirection: "column" as const, gap: "8px", textAlign: "left" as const },
    label: { fontSize: "14px", fontWeight: "600", color: "#475569" },
    input: { padding: "14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "16px", backgroundColor: "#f8fafc", outline: "none" },
    button: { backgroundColor: "#10b981", color: "#fff", padding: "16px", borderRadius: "8px", cursor: "pointer", border: "none", fontSize: "16px", fontWeight: "bold" },
    buttonDisabled: { backgroundColor: "#e2e8f0", color: "#94a3b8", padding: "16px", borderRadius: "8px", cursor: "not-allowed", border: "none", fontSize: "16px", fontWeight: "bold" },
    status: { marginTop: "10px", fontWeight: "600", textAlign: "center" as const },
    hashBox: { backgroundColor: "#f0fdf4", padding: "15px", borderRadius: "8px", border: "1px solid #bbf7d0", marginTop: "10px", wordBreak: "break-all" as const },
    link: { color: "#059669", textDecoration: "none", fontFamily: "monospace", fontWeight: "500" }
};

export default SendXLM;