import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const N8N_WEBHOOK = "https://finbridge.app.n8n.cloud/webhook/fintech-review";

app.post("/analyze", async (req, res) => {
  try {
    const { input_text, answers } = req.body;

    const payload = {
      input_text: input_text + " " + JSON.stringify(answers || {})
    };

    const response = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    return res.json(data);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Something went wrong"
    });
  }
});

app.get("/", (req, res) => {
  res.send("FinBridge API Running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
