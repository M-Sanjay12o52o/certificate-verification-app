import connectMongoDB from "@/lib/mongodb";
import Student from "@/models/students";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  await connectMongoDB();
  await Student.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Student deleted successfully" },
    { status: 200 }
  );
}
