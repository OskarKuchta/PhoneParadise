import express from "express";
import cors from "cors";
import products from "./products.js";
const app = express();
const port = 5000;


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome in our shop!");
})
app.get("/products", (req, res) => {
    res.send(products)
})

app.listen(port, console.log(`Server running on server ${port}`));