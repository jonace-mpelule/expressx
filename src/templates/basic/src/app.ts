import express, { Express, Request, Response } from "express";
import exampleRoute from "./routes/example.route.ts";
import env from "@/config/env.ts";

const app: Express = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/example", exampleRoute);

app.listen(env.PORT, () => console.log(`Server is running on port ${env.PORT}`));
