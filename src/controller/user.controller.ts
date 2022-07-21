import log from "../logger";
import {Request, Response} from "express";
import {createUser} from "../service/user.service";
import {omit} from "lodash";

export async function createUserHandler(req: Request, res: Response ){
    try{
        const user = await createUser(req.body);
        return res.status(201).send(omit(user.toJSON(), "password"));
    } catch (e: any) {
        log.error(e);
       return res.status(409).send(e.message);
    }
}

