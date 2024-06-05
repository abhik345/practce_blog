import express from "express";
import cors from "cors";
import userRouter from "./api/v1/users/users.router.js"

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());
app.use("/api/v1/users",userRouter);

app.listen(port,() => console.log(`Port has benn connected ${port}!`));

