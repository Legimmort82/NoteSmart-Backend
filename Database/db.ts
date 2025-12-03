import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://salimmh8282:Salim.1382@legimmort.smtwg9p.mongodb.net/NoteApp?retryWrites=true&w=majority&appName=Legimmort");
    console.log("connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectToDB };
