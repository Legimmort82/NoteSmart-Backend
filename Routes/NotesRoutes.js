const express = require("express");
const {GetAllNotes,CreateNote, UpdateNote, DeleteNote, GetSingleNote} = require("../Controllers/NoteController");
const AuthMiddleware = require('../MiddleWares/AuthMiddleware');

const router = express.Router();
router.use(AuthMiddleware);
router.get("/notes", GetAllNotes);
router.get("/notes/:id", GetSingleNote);
router.post("/notes", CreateNote);
router.put("/notes/:id", UpdateNote);
router.delete("/notes/:id", DeleteNote);

module.exports = router;
