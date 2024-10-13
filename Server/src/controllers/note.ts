import { RequestHandler } from "express";
import Note, { NoteDocument } from "../models/note";

export interface IncomingBody {
  title: string;
  description?: string;
}

export const create: RequestHandler = async (req, res) => {
  const newNote = new Note<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  });
  await newNote.save();
  res.json({
    note: {
      id: newNote._id,
      title: newNote.title,
      description: newNote.description,
    },
  });
  console.log(req.body);
};
export const removeSingleNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;
  const removedNode = await Note.findByIdAndDelete(noteId);
  if (!removedNode) return res.json({ error: "Could not remove note" });
  res.json({ message: "Note removed successfully" });
};

export const updateSingleNote: RequestHandler = async (req, res) => {
  /*const {noteId} = req.params;
  const note = await Note.findById(noteId);
  if(!note) return res.json({error:"Note not found"})
  const {title , description} = req.body as IncomingBody
  if(title) note.title = title;
  if(description) note.description = description;
  await note.save();
  res.json({note})*/
  const { noteId } = req.params;
  const { title, description } = req.body as IncomingBody;

  const note = await Note.findByIdAndUpdate(
    noteId,
    { title, description },
    { new: true }
  );
  if (!note) return res.json({ error: "note not found" });
  //await note.save();
  res.json({
    note: { id: note._id, title: note.title, description: note.description },
  });
};
export const readAll: RequestHandler = async (req, res) => {
  const notes = await Note.find();
  res.json({
    notes: notes.map((note) => {
      return {
        id: note._id,
        title: note.title,
        description: note.description,
      };
    }),
  });
};
export const readSingleNote: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) return res.json({ error: "Note not found!" });
  res.json({ note });
};
