# 🏘️ Neighborhood Help Fund (Stellar Testnet)

**Level 1 - White Belt Submission: Simple Payment dApp**

Empowering communities through secure micro-donations on the Stellar blockchain! 
A seamless interface for neighbors to connect, view balances, and send financial support in seconds.

---

## 🚀 Live Demo : https://neighborhood-help-fund.vercel.app/

## 🎯 What's This?

This is a decentralized application (dApp) built on the Stellar testnet that acts as a financial foundation for a broader community support network. Perfect for:
*   🤝 **Supporting Neighbors:** Sending quick micro-donations to those in need.
*   🎓 **Learning Stellar:** Demonstrating core Web3 concepts and SDK integrations.
*   🚀 **Fast Payments:** Utilizing the speed and low fees of the Stellar network.

---

## ✨ Features

**✅ Core Implementation (Ready to Use!)**

*   🔌 **Wallet Connection:** Securely connect and disconnect using the Freighter browser extension.
*   💰 **Live Balances:** Automatically fetches and displays the user's native XLM testnet balance.
*   💸 **Send Payments:** Streamlined interface to send XLM to any valid Stellar address.
*   🛡️ **Robust Error Handling:** Detects and alerts users of invalid addresses, insufficient funds, and unfunded destination accounts (`op_no_destination`).
*   🔗 **Blockchain Verification:** Displays clickable transaction hashes linked to the Stellar Expert explorer upon successful payments.
*   📱 **Modern UI:** Clean, responsive, and trustworthy aesthetic using modern CSS styling.

---

## 🚀 Quick Start

### Prerequisites
*   **Node.js 18+** - [Download here](https://nodejs.org/)
*   **A Stellar Wallet** - Install [Freighter](https://www.freighter.app/) (Ensure it is set to the **Testnet**)

### Installation

  # 1. Clone the repository
  git clone [https://github.com/AYUSHKRSHARMA4986/neighborhood-help-fund.git](https://github.com/AYUSHKRSHARMA4986/neighborhood-help-fund.git)
  
  # 2. Enter the project directory
  cd neighborhood-help-fund
  
  # 3. Install dependencies
  npm install
  
  # 4. Start the development server
  npm run dev


Open http://localhost:5173 in your browser.


# Get Testnet XLM

Connect your Freighter wallet to the app.

Copy your G... address.

Visit the Stellar Laboratory Faucet.

Paste your address and click "Get test network XLM".

Refresh the page to see your updated balance!


## 📸 Screenshots

  #1. Wallet Connected State
  <img width="1230" height="918" alt="Screenshot 2026-06-16 143106" src="https://github.com/user-attachments/assets/bf1a3d4c-9a54-44b4-883e-58f0b971690d" />

  #2. Balance Displayed
  <img width="1230" height="918" alt="Screenshot 2026-06-16 143106" src="https://github.com/user-attachments/assets/fd850173-ecd4-405f-aea9-17e89f3fd612" />
  
  #3. Successful Testnet Transaction
  <img width="1828" height="816" alt="Screenshot 2026-06-16 143425" src="https://github.com/user-attachments/assets/6fbef76e-ad9f-45d5-a5ef-f168f9a190e6" />
  
  #4. Transaction Result is Shown to the User
  <img width="1202" height="922" alt="Screenshot 2026-06-16 143257" src="https://github.com/user-attachments/assets/4f3a6a9f-eb4e-4fbf-aa76-e67e7f33743a" />


## 📁 Project Structure

<img width="891" height="305" alt="image" src="https://github.com/user-attachments/assets/7bb252eb-2ada-4567-b31f-9b1f506c3337" />



## 📦 Tech Stack

<img width="917" height="365" alt="image" src="https://github.com/user-attachments/assets/2675fb3e-2e41-4a6c-9ad5-755d7d060b29" />


## 🆘 Troubleshooting

  Wallet won't connect? Make sure you have the Freighter extension installed and unlocked in your browser.
  
  Balance shows 0? You need to fund your account using the Stellar Friendbot/Faucet linked in the setup instructions.
  
  Transaction fails?
  
  Ensure you have enough XLM (Stellar requires a minimum reserve).
  
  Ensure the recipient address is mathematically valid.
  
  Ensure the recipient account has been funded with at least 1 XLM so it exists on the ledger.
