import mongoose, { Schema } from "mongoose";

const studentsSchema = new Schema(
  {
    name: String,
    number: Number,
    id: Number,
    email: String,
    uniqueId: String,
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models.Student || mongoose.model("Student", studentsSchema);

export default Student;
