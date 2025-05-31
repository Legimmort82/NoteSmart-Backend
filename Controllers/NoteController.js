const Note = require("../Models/Note");

const GetAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
const CreateNote = async (req, res) => {
  try {
    const { title, date, description, color, tag, isFavorite, isTrash } =
      req.body;
    const note = new Note({
      title,
      date,
      user: req.user.userId,
      description,
      color,
      tag,
      isFavorite,
      isTrash,
    });
    await note.save();
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
const GetSingleNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.find({ _id: id, user: req.user.userId });
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
const UpdateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, description, color, tag, isFavorite, isTrash } = req.body;

    // بررسی وجود عنوان و محتوا
    if (!title || !description || !tag) {
      return res.status(400).json({
        success: false,
        message: "Note title is required",
      });
    }

    // یافتن و به‌روزرسانی نوت
    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: id,
        user: req.user.userId, // فقط نوت‌های متعلق به کاربر جاری
      },
      {
        title,
        date,
        user: req.user.userId,
        description,
        color,
        tag,
        isFavorite,
        isTrash,
      },
      { new: true } // برای برگشت نسخه به‌روزرسانی شده
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

const DeleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // یافتن و حذف نوت
    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      user: req.user.userId, // فقط نوت‌های متعلق به کاربر جاری
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

module.exports = {
  GetAllNotes,
  CreateNote,
  UpdateNote,
  DeleteNote,
  GetSingleNote,
};
