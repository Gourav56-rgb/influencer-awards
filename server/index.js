import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import contestsRouter from "./routes/contestsRoutes.js"
import path from "path"
import { fileURLToPath } from 'url';

dotenv.config()

connectDB()

const app = express();
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}
app.use(cors(corsOptions))

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/contests', contestsRouter);

app.get("/", (req, res) => {
  res.send("This is home route")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});