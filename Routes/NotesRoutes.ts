import express from "express";
import{
  GetAllNotes,
  CreateNote,
  UpdateNote,
  DeleteNote,
  GetSingleNote,
} from "../Controllers/NoteController"
import { AuthMiddleware } from "../MiddleWares/AuthMiddleware";

const NoteRouter = express.Router();
NoteRouter.use(AuthMiddleware);
NoteRouter.get("/notes", GetAllNotes);
NoteRouter.get("/notes/:id", GetSingleNote);
NoteRouter.post("/notes", CreateNote);
NoteRouter.put("/notes/:id", UpdateNote);
NoteRouter.delete("/notes/:id", DeleteNote);

export { NoteRouter };
