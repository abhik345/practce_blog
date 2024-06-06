import express from "express";
import cors from "cors";
import userRouter from "./api/v1/users/users.router.js";
import categoryRouter from "./api/v1/category/category.router.js";

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());
app.use("/api/v1/users",userRouter);
app.use("/api/v1/category",categoryRouter);

app.listen(port,() => console.log(`Port has benn connected ${port}!`));

