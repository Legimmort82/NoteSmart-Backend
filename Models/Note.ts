import mongoose, { Schema, Document } from "mongoose";

interface INote extends Document {
  user: string | mongoose.Schema.Types.ObjectId;
  title: string;
  date: string;
  description: string;
  color: string;
  tag: string;
  isFavorite: boolean;
  isTrash: boolean;
}

const NoteSchema = new Schema<INote>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: false,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  isTrash: {
    type: Boolean,
    default: false,
  },
});

const Note = mongoose.model<INote>("Note", NoteSchema);

export { Note, INote };
