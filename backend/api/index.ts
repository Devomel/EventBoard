import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import cors from "cors"
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

const mongoURI = process.env.DB_URL;


const start = async () => {
  try {
    if (!mongoURI) {
      throw new Error('DB_URL is not defined in the environment variables');
    }
    await mongoose.connect(mongoURI)
    app.get('/', (req: Request, res: Response) => {
      res.send('Hello, TypeScript with Express!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    app.get('/events', (req: Request, res: Response) => {
      const events = [
        { id: 1, title: 'Event 1', description: 'Description for event 1', date: '2024-09-25' },
        { id: 2, title: 'Event 2', description: 'Description for event 2', date: '2024-09-26' },
      ];
      res.json(events);
    });
  } catch (error) {
    console.log(error)
  }
}
module.exports = app;