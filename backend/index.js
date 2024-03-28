import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDb from "./config/connectdb.js";
import clientRoutes from "./routes/clientRoutes.js";

import designRoutes from "./routes/designRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// CORS policy
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

const corsOptions = {
  // origin: "http://localhost:3000",
  // method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  // credentials: true,
};
app.use(cors(corsOptions));

// Database connection
connectDb(DATABASE_URL);

//JSON
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Load Routes
app.use("/api/user", clientRoutes);
app.use("/api/designs", designRoutes);

app.use("/api/appointments", appointmentRoutes);

app.listen(port, () => {
  console.log(`Server listenning at port ${port}`);
});
