import { User } from "../Models/User";
import { Request, Response } from "express";

const GetCurrentUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.find({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateFields: any = {};

    const allowedFields = ["email", "age", "firstName", "lastName"];

    allowedFields.map((field) => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    const updateUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "User not found or no permission",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { GetCurrentUser, UpdateUser };
