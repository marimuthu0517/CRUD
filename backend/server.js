import connectDB from "./config/db.js";
import cors from "cors";
import express from "express";
import Routes from "./routes/ProductRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 5000;

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

await connectDB();

app.use("/product", Routes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on http://0.0.0.0:${PORT}`);
});

