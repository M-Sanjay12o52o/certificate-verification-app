import connectMongoDB from "@/lib/mongodb";
import Student from "@/models/students";
import { NextResponse } from "next/server";

export async function GET(res: NextResponse) {
  await connectMongoDB();

  const students = await Student.find();

  return NextResponse.json({ students });
}
