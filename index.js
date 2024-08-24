//importing libraries
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
// import { fileURLToPath } from 'url';
// import path,{ dirname } from 'path';
import path from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const __dirname = path.resolve();

//importing components
import Connection from "./database/db.js";
import router from "./routes/route.js";
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // Frontend URL
  credentials: true, // Enable cookies and CORS for credentials
};

app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//serve the static files
app.use(express.static(path.join(__dirname, "./client/build")));
app.use("/", router);

app.get("*",function(_,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

const PORT = process.env.PORT || 5000;

Connection();
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
