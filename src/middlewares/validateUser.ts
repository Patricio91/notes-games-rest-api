import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface IPayload {
    id: string;
    role: string;
    iat: number;
    exp: number;
}

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("auth-header");
    try {
        if (!token) return res.status(401).json("No hay token en la petición. Acceso denegado");
        const payload = jwt.verify(token, process.env.SECRET_TOKEN || "token_test_games") as IPayload;
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