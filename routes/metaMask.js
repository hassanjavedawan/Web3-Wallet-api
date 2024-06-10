/** @format */

// routes/metaMask.js

const express = require("express");
const router = express.Router();
const Web3 = require("web3");

// Initialize Web3 with MetaMask provider
const web3 = new Web3(window.ethereum);

const connectMetaMask = async () => {
  if (window.ethereum) {
    //check if Metamask is installed
  try {
    // Enable MetaMask
    await window.ethereum.enable();

    // Get selected address
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0]; // Assuming MetaMask is connected and has at least one account selected

    return {
      connectedStatus: true,
      status: "true",
      address: address,
    };
  } catch (error) {
    return {
      connectedStatus: false,
      status: "🦊 Connect to MetaMask using the button on the top right.",
    };
  }
}
  else {
    return {
      connectedStatus: false,
      status:
        "🦊 You must install Metamask into your browser: https://metamask.io/download.html",
    };
  }
};

router.post("/", async (req, res) => {
  try {
    const result = await connectMetaMask();
    res.json({ message: "MetaMask Wallet Address", result });
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  // const walletAddress = "MetaMask Wallet Address";
  // res.json({ address: walletAddress });
});

module.exports = router;
