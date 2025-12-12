import mongoose from "mongoose";

const ConnectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/NoteApp");
    console.log("Mongodb Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { ConnectToDB };
