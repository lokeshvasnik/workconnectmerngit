import express from "express";
import userRouter from "./routes/user.js";
import jobRouter from "./routes/job.js";
import cors from "cors";
import connectToMongo from "./Db/mongo.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());

app.use(cors());

app.use(userRouter);
app.use(jobRouter);
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(join(__dirname, "uploads")));

app.listen(3000, () => {
    console.log(`Server Started ${3000}`);
});

connectToMongo();

// mongodb+srv://lokeshvasnik2003:FOQ1OPJCjT2SHraU@cluster0.wr8zkex.mongodb.net/
// Mongodb string
// lokeshvasnik2003
// FOQ1OPJCjT2SHraU
