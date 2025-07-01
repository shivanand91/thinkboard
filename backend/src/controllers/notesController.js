import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
}

export async function getNoteById(req, res) {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(note);
    
    // res.status(200).json({ message: `Fetched note with ID: ${id}` });
}

export async function createNote(req, res) {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
}

export async function updateNote(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(updatedNote);
}

export async function deleteNote(req, res) {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
}

