import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import serverless from "serverless-http";
import products from "../data/products";
import { MongoClient } from "mongodb";

const app = express();
const router = express.Router();
const uri = "mongodb+srv://Oskar98:kuchta123@cluster0.bsb9bp8.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true });
const databaseName = 'ratings';
const collectionName = 'ratings';

const database = client.db(databaseName);
const collection = database.collection(collectionName);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}

connectToDatabase();
app.use(express.json())

router.use(cors({
    origin: "*"
}));

const ratingSchema = new mongoose.Schema({
    rating: Number,
});

const Rating = mongoose.model('Rating', ratingSchema);
connectToDatabase();


router.post("/vote", async (req, res) => {
    const rating = req.body.rating;

    try {
        const newRating = new Rating({ rating });
        await newRating.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving rating to the database', error);
        res.status(500).json({ success: false });
    }
});

router.get("/vote", async (req, res) => {

    try {
        const result = await collection.find({}).toArray();
        console.log('Fetched data:', result);
        res.send(result);
    } catch (error) {
        console.error('Error fetching data', error);
        res.status(500).json({ success: false });
    }
});
router.get("/products", (req, res) => {
    res.send(products)
})

app.use('/.netlify/functions/index', router);
export const handler = serverless(app);