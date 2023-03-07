import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IPayload } from "./index";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const token: string | undefined = req.header("auth-header");
    try {
        if (!token || token === undefined) {
            return res.status(401).json({ message: "No hay token en la petición. Acceso denegado" });
        }
        const payload: IPayload = jwt.verify(token, process.env.SECRETE_TOKEN || "token_test_games") as IPayload;
        req.userId = payload.id;
        if (id != req.userId) {
            return res.status(401).send({ message: "Rol no válido. Acceso denegado" });
        } else {
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: "Token no válido. Acceso denegado" });
    }
}