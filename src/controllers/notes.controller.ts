import { Request, Response } from "express";
import { Note } from "../entities/Note";
import { noteSchema, updateNoteSchema } from "../validators/noteSchema";

// POST
export const addNoteGame = async (req: Request, res: Response) => {
    try {
        const { game_name, description, year, price, console, link, user_id } = req.body;
        const saveNote = await noteSchema.validateAsync(req.body);
        const note = new Note();
        note.game_name = game_name;
        note.description = description;
        note.year = year;
        note.price = price;
        note.console = console;
        note.link = link;
        note.user_id = user_id;
        const savedNote = await note.save();
        return res.json(savedNote);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET
export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const notes = await Note.find();
        return res.json(notes);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET
export const getNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const note = await Note.findBy({id: parseInt(req.params.id)});
        return res.json(note);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// PUT
export const updateNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { game_name, description, price,console, year, link } = req.body;
        const note = await Note.findOneBy({id: parseInt(req.params.id)});
        if (!note) return res.status(404).send({message: "La nota que busca no existe"});
        const updateNote = await updateNoteSchema.validateAsync(req.body);
        note.game_name = game_name;
        note.description = description;
        note.price = price;
        note.console = console;
        note.year = year;
        note.link = link;
        const savedNote = await note.save();
        return res.status(200).json(savedNote);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// DELETE
export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteNote = await Note.delete({id: parseInt(id)});
        if (deleteNote.affected === 0) {
            return res.status(404).send({message: "La nota que intenta borrar no se encontró"});
        }
        return res.status(200).send({message: "Nota borrada"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}