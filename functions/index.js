import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import products from "./products.js";
const app = express();
const router = express.Router();

router.use(cors({
    origin: "*"
}));


app.get("/", (req, res) => {
    res.send("Welcome in our shop!");
})
app.get("/products", (req, res) => {
    res.send(products)
})

app.use('/.netlify/functions/index', router);
export const handler = serverless(app);