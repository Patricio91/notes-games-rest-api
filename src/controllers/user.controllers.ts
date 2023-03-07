import { Request, Response } from "express";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UpdateUserSchema, UserSchema } from "../validators/userSchema";
const saltround = 10;

// POST 
export const signUp = async (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync();
    try {
        const { firstname, lastname, username, email, password } = req.body;
        const user: User = new User();
        await UserSchema.validateAsync(req.body);
        user.firstname = firstname;
        user.lastname = lastname;
        user.username = username;
        user.email = email;
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        res.status(201).send({ message: `Cuenta creada. Bienvenido usuario ${username}` });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET
export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users: User[] = await User.find();
        if (users.length === 0) return res.status(404).send({ message: "Aún no hay usuarios registrados" });
        return res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET
export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user: User | null = await User.findOneBy({ id: parseInt(id) });
        if (!user || user === null) return res.status(404).json({ message: `El usuario con ID ${id} no existe` });
        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// PUT 
export const updateUser = async (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync();
    try {
        const { id } = req.params;
        const { username, password, email } = req.body;
        const user: User | null = await User.findOneBy({ id: parseInt(id) });
        if (!user || user === null) return res.status(404).send({ message: "El usuario no existe" });
        await UpdateUserSchema.validateAsync(req.body);
        user.username = username;
        user.password = bcrypt.hashSync(password, salt);
        user.email = email;
        await user.save();
        res.status(200).send({ message: "El usuario fue actualizado correctamente" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteUser = await User.delete({ id: parseInt(id) });
        if (deleteUser.affected === 0) {
            return res.status(404).json({ message: "Usuario no encontrado o incorrecto. Intente nuevamente" })
        }
        return res.status(200).send({ message: "Usuario borrado exitosamente. Hasta luego" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// POST
export const signIn = async (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync();
    try {
        const { username, password } = req.body;
        const user: User | null = await User.findOne({ where: { username: req.body.username } });
        if (!user || user === null) {
            return res.status(400).send({ message: "El usuario es incorrecto. Intente nuevamente" })
        }
        const validatePassword: boolean = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).send({ message: "Contraseña incorrecta. Intente nuevamente" });
        }
        const token: string = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_TOKEN || "token_test_games", {
            expiresIn: "24h"
        });
        res.status(200).json({ user, token });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}