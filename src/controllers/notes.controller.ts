import { Request, Response } from "express";
import { Note } from "../entities/Note";
import { noteSchema, updateNoteSchema } from "../validators/noteSchema";

// POST
export const addNoteGame = async (req: Request, res: Response) => {
    try {
        const { game_name, description, year, price, console, link, user_id } = req.body;
        await noteSchema.validateAsync(req.body);
        const note: Note = new Note();
        note.game_name = game_name;
        note.description = description;
        note.year = year;
        note.price = price;
        note.console = console;
        note.link = link;
        note.user_id = user_id;
        await note.save();
        return res.status(201).json(note);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET
export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const notes: Note[] = await Note.find();
        if (notes.length === 0) return res.status(404).send({ message: "No hay lista de notas aún" });
        return res.status(200).json(notes);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET
export const getNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const note: Note = await Note.findOneByOrFail({ id: parseInt(id) });
        if (!note) return res.status(200).json({ message: "No existe una nota con el ID indicado" });
        return res.json(note);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// PUT
export const updateNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { game_name, description, price, console, year, link } = req.body;
        const note: Note | null = await Note.findOneBy({ id: parseInt(id) });
        if (!note || note === null) return res.status(404).send({ message: "La nota que busca actualizar no existe" });
        await updateNoteSchema.validateAsync(req.body);
        note.game_name = game_name;
        note.description = description;
        note.price = price;
        note.console = console;
        note.year = year;
        note.link = link;
        await note.save();
        return res.status(200).json(note);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// DELETE
export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteNote = await Note.delete({ id: parseInt(id) });
        if (deleteNote.affected === 0) {
            return res.status(404).send({ message: "La nota que intenta borrar no se encontró" });
        }
        return res.status(200).send({ message: "Nota borrada" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}