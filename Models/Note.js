const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
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
    required: true
  },
  tag:{
    type:String,
    required:false,
  },
  isFavorite:{
    type :Boolean,
    default : false,
  },
  isTrash:{
    type :Boolean,
    default : false,
  }
});

module.exports = mongoose.model("Note", noteSchema);
