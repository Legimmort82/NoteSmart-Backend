const Note = require("../Models/Note");

const GetAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.userId }).sort("-createdAt");
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "خطای سرور" });
  }
};
const CreateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      user: req.user.userId,
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
 const GetSingleNote = async (req,res)=>{
try {
  const {id}= req.params
  const note = await Note.find({_id:id,user:req.user.userId})
  if (!note){
    return res.status(404).json({
      success: false,
      message: "Note not found with this id"
    })
  }
  return res.status(200).json({
    success: true,
    message : "Note fetched successfully",
    data : note
  })
} catch (error) {
  res.status(500).json({ message: "خطای سرور" });
}

 }
const UpdateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // بررسی وجود عنوان و محتوا
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "عنوان و محتوای نوت الزامی هستند",
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
        content,
        updatedAt: Date.now(),
      },
      { new: true } // برای برگشت نسخه به‌روزرسانی شده
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

module.exports = { GetAllNotes, CreateNote, UpdateNote, DeleteNote,GetSingleNote };
