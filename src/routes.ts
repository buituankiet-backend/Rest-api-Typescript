import {Express, Request, Response} from "express";
import {createUserHandler} from "./controller/user.controller";
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler } from "./controller/session.controller";
import {validateRequest, requiresUser} from "./middleware/index";
import {createUserSchema, createUserSessionSchema} from "./schema/user.schema";

export default function (app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.status(200).json("Oke")
    })

    //Register user
    // POST /api/user
    app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

    //login
    // POST /api/sessions
    app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);

    //Get The User's Sessions
    //GET /api/sessions
    app.get("/api/sessions", requiresUser, getUserSessionsHandler);

    //Logout
    //DELETE /api/sessions
    app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);
}

