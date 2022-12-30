import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ProjectRoute from "./Routes/ProjectRoute.js"
import path from 'path'
import { fileURLToPath } from "url";
import bodyParser from "body-parser";



const app = express();
mongoose.connect('mongodb+srv://bitzzy:bitzzy123@cluster0.3nkqh9n.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json())

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected'));


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use('/images', express.static(path.join(__dirname + '/images')));
app.use(express.json())
app.use(ProjectRoute)


const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`servser is running on http:localhost:${process.env.PORT}`))