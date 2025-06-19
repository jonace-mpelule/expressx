import { Request, Response } from "express";
const exampleRoute = (req: Request, res: Response) => {
    res.send("Hello! from example route");
}

export default exampleRoute;