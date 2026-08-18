import connectDB from "./config/db.js";
import cors from "cors";
import express from 'express';
import Routes from './routes/ProductRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

await connectDB();

app.use('/product', Routes);

app.listen(PORT, ()=> { console.log(" backend connected successfully http://localhost:3000")});

