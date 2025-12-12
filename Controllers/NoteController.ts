import { Note, INote } from "../Models/Note";
import { Request, Response } from "express";

interface CustomRequest extends Request {
  user: { userId: string };
}

const GetAllNotes = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  try {
    const notes: INote[] = await Note.find({
      user: customReq.user.userId,
      isTrash: false,
    }).sort("-createdAt");

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const GetFavoriteNotes = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  try {
    const notes: INote[] = await Note.find({
      user: customReq.user.userId,
      isFavorite: true,
    }).sort("-createdAt");

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const GetTrashNotes = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  try {
    const notes: INote[] = await Note.find({
      user: customReq.user.userId,
      isTrash: true,
    }).sort("-createdAt");

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const CreateNote = async (req: Request, res: Response) => {
  try {
    const NoteSchema = req.body;

    const note = new Note(NoteSchema);

    await note.save();

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error" });
  }
};

const GetSingleNote = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  try {
    const { id } = req.params;
    const note: INote[] = await Note.find({
      _id: id,
      user: customReq.user.userId,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found with this id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const UpdateNote = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  try {
    const { id } = req.params;
    const NoteSchema = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: id,
        user: customReq.user.userId,
      },
      {
        NoteSchema,
        user: customReq.user.userId,
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note is not found or you do not have access to update it",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedNote,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const DeleteNote = async (req: Request, res: Response) => {
  const customReq = req as CustomRequest;
  try {
    const { id } = req.params;

    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      user: customReq.user.userId,
    });

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note is not found or you do not have access to delete it",
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedNote,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export {
  GetAllNotes,
  CreateNote,
  UpdateNote,
  DeleteNote,
  GetSingleNote,
  GetFavoriteNotes,
  GetTrashNotes,
};
