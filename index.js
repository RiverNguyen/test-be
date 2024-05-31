import express from "express";
import authRouter from "./routers/auth.js";
import productRouter from "./routers/product.js";
import categoryRouter from "./routers/category.js";
import cartRouter from "./routers/cart.js";
import orderRouter from "./routers/order.js";
import attributeRouter from "./routers/attribute.js";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

connectDB(process.env.DB_URI);
const post = process.env.PORT;

app.listen(post, () => {
    console.log(`Server is running on port http://localhost:${post}`);
});

app.use(`/api/v1/`, authRouter);
app.use(`/api/v1/`, productRouter);
app.use(`/api/v1/`, categoryRouter);
app.use(`/api/v1/`, cartRouter);
app.use(`/api/v1/`, attributeRouter);
app.use(`/api/v1/`, orderRouter);

// export const viteNodeApp = app;
