//importing libraries
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

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
app.use("/", router);

const PORT = process.env.PORT;

Connection();
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
