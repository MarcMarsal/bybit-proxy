import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", async (req, res) => {
  try {
    const qs = new URLSearchParams(req.query).toString();
    const url = `https://api.bybit.com/v5/market/kline?${qs}`;

    console.log("Cridant Bybit:", url);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    const text = await response.text();

    res.setHeader("Content-Type", "application/json");
    res.send(text);
  } catch (err) {
    console.error("Error al proxy:", err);
    res.status(500).json({ error: "Proxy error" });
  }
});

app.listen(3000, () => console.log("Proxy Bybit actiu a port 3000"));
