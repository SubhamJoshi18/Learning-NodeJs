import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import startDB from "./db/connect.js";
import authrouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

startDB();

app.get("/", (req, res) => {
  res.json({
    message: "Server is currently working on Localhost:3000",
  });
});

app.use("/auth", authrouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
// app.use("/user");

app.use(async (req, res, next) => {
  next(createError.BadRequest("The Route You have Entered is not exist"));
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.json({
    Error: true,
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
