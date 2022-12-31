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
        const user = new User();
        const validateUser = await UserSchema.validateAsync(req.body);
        user.firstname = firstname;
        user.lastname = lastname;
        user.username = username;
        user.email = email;
        user.password = bcrypt.hashSync(password, salt);
        const savedUser = await user.save();
        res.status(200).send({message: "Usuario creado correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET
export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET
export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findBy({id: parseInt(req.params.id)});
        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// PUT 
export const updateUser = async (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync();
    try {
        const { id } = req.params;
        const { username, password } = req.body;
        const user = await User.findOneBy({id: parseInt(req.params.id)});
        if (!user) return res.status(404).send({message: "El usuario no existe"});
        const updateUser = await UpdateUserSchema.validateAsync(req.body);
        user.username = username;
        user.password = bcrypt.hashSync(password, salt);
        const saveUser = await user.save();
        res.status(200).send({message: "El usuario fue actualizado correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteUser = await User.delete({id: parseInt(id)});
        if (deleteUser.affected === 0) {
            return res.status(404).json({message: "Usuario no encontrado o incorrecto. Intente nuevamente"})
        }
        return res.status(200).send({message: "Usuario borrado exitosamente. Hasta luego"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// POST
export const signIn = async (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync();
    try {
        const { username, password } = req.body;
        const user = User.findOne({where: {username: req.body.username}});
        if (!user) {
            return res.status(400).send({message: "El usuario es incorrecto. Intente nuevamente"})
        }
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).send({message: "Contraseña incorrecta. Intente nuevamente"});
        }
        const token = jwt.sign({id: user.id, role: user.role}, process.env.SECRET_TOKEN || "token_test_games", {
            expiresIn: "24h"
        });
        res.header("auth-header", token).send({message: "Sesión iniciada correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({message: error.message});
        }
    }
}