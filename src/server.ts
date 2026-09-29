import express from "express";
import dotenv from "dotenv";
import { supabase } from "./config/supabase";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Provn backend is running"
  });
});

app.get("/test-db", async (req, res) => {
  const { data, error } = await supabase
    .from("test")
    .select("*");

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});