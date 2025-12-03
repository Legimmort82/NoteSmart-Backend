import {Note,INote} from "../Models/Note"
import {Request,Response} from "express"
interface CustomRequest extends Request{
  user:{userId: string}
}
const GetAllNotes = async (req:Request, res:Response) => {
   const customReq = req as CustomRequest;
  try {
    const notes : INote[] = await Note.find({ user: customReq.user.userId }).sort("-createdAt");
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "خطای سرور" });
  }
};
const CreateNote = async (req:Request, res:Response) => {
  const customReq = req as CustomRequest;
  try {
    const { title, date, description, color, tag, isFavorite, isTrash } =
      req.body;
    const note = new Note({
      title,
      date,
      user: customReq.user.userId,
      description,
      color,
      tag,
      isFavorite,
      isTrash,
    });
    await note.save();
    res.status(201).json({
      success: true,
      message: "موفقیت آمیز",
      data: note,
    });
  } catch (error) {
    res.status(500).json({ message: "خطای سرور" });
  }
};
const GetSingleNote = async (req:Request, res:Response) => {
  const customReq = req as CustomRequest;
  try {
    const { id } = req.params;
    const note :INote[]= await Note.find({ _id: id, user: customReq.user.userId });
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
    res.status(500).json({ message: "خطای سرور" });
  }
};
const UpdateNote = async (req:Request, res:Response) => {
  const customReq = req as CustomRequest;
  try {
    const { id } = req.params;
    const { title, date, description, color, tag, isFavorite, isTrash } = req.body;

    if (!title || !description || !tag) {
      return res.status(400).json({
        success: false,
        message: "عنوان نوت الزامی هستند",
      });
    }

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: id,
        user: customReq.user.userId,
      },
      {
        title,
        date,
        user: customReq.user.userId,
        description,
        color,
        tag,
        isFavorite,
        isTrash,
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "نوت یافت نشد یا شما مجوز ویرایش آن را ندارید",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedNote,
      message: "نوت با موفقیت به‌روزرسانی شد",
    });
  } catch (error) {
    console.error("خطا در به‌روزرسانی نوت:", error);
    return res.status(500).json({
      success: false,
      message: "خطای سرور در به‌روزرسانی نوت",
    });
  }
};

const DeleteNote = async (req:Request, res:Response) => {
  const customReq = req as CustomRequest;
  try {
    const { id } = req.params;

    // یافتن و حذف نوت
    const deletedNote = await Note.findOneAndDelete({
      _id: id,
      user: customReq.user.userId, // فقط نوت‌های متعلق به کاربر جاری
    });

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "نوت یافت نشد یا شما مجوز حذف آن را ندارید",
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedNote,
      message: "نوت با موفقیت حذف شد",
    });
  } catch (error) {
    console.error("خطا در حذف نوت:", error);
    return res.status(500).json({
      success: false,
      message: "خطای سرور در حذف نوت",
    });
  }
};

export {
  GetAllNotes,
  CreateNote,
  UpdateNote,
  DeleteNote,
  GetSingleNote,
};
