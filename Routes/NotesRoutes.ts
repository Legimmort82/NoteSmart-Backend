import express from "express";
import {
  GetAllNotes,
  CreateNote,
  UpdateNote,
  DeleteNote,
  GetSingleNote,
  GetFavoriteNotes,
  GetTrashNotes,
} from "../Controllers/NoteController";
import { AuthMiddleware } from "../MiddleWares/AuthMiddleware";

const NoteRouter = express.Router();

NoteRouter.use(AuthMiddleware);

NoteRouter.get("/notes", GetAllNotes);
NoteRouter.get("/notes/:id", GetSingleNote);
NoteRouter.get("/favorites", GetFavoriteNotes);
NoteRouter.get("/trashes", GetTrashNotes);
NoteRouter.post("/notes", CreateNote);
NoteRouter.patch("/notes/:id", UpdateNote);
NoteRouter.delete("/notes/:id", DeleteNote);

export { NoteRouter };
