import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IPayload } from "./index";

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.header("auth-header");
    try {
        if (!token || token === undefined) return res.status(401).json("No hay token en la petición. Acceso denegado");
        const payload: IPayload = jwt.verify(token, process.env.SECRET_TOKEN || "token_test_games") as IPayload;
        req.userId = payload.id;
        req.userRole = payload.role;
        if (req.userRole == "USER_ROLE") {
            next();
        } else {
            res.status(401).json("Rol no válido. Acceso denegado");
        }
    } catch (error) {
        res.status(401).json("Token no válido. Acceso denegado");
    }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.header("auth-header");
    try {
        if (!token || token === undefined) return res.status(401).json("No hay token en la petición. Acceso denegado");
        const payload = jwt.verify(token, process.env.SECRET_TOKEN || "token_test_games") as IPayload;
        req.userId = payload.id;
        req.userRole = payload.role;
        if (req.userRole == "ADMIN_ROLE") {
            next();
        } else {
            res.status(401).json("Usted no es administrador. Acceso denegado");
        }
    } catch (error) {
        res.status(401).json("Token no válido. Acceso denegado")
    }
}