import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());

const mongoURI = process.env.DB_URL;


const start = () => {
  try {
    if (!mongoURI) {
      throw new Error('DB_URL is not defined in the environment variables');
    }

    app.get('/', (req: Request, res: Response) => {
      res.send('Hello, TypeScript with Express!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    mongoose.connect(mongoURI)
  } catch (error) {
    console.log(error)
  }
}

module.exports = start;