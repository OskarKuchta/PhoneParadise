import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import products from "../data/products.js";
import rating from "../data/ratings";
const app = express();
const router = express.Router();

app.use(express.json())

router.use(cors({
    origin: "*"
}));

router.get("/vote", (req, res) => {
    res.send(rating)
})
router.post("/vote", (req, res) => {
    const { rate } = req.body;
    rating.default.push({
        date: new Date(),
        rate: rate,
    });
    res.status(201).json({ message: "Vote added successfully" });
});

router.get("/products", (req, res) => {
    res.send(products)
})

app.use('/.netlify/functions/index', router);
export const handler = serverless(app);