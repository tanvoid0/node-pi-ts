import express, {Express, Request, Response, Application} from "express";
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to EX");
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});