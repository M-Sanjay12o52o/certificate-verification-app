import connectMongoDB from "@/lib/mongodb";
import Student from "@/models/students";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { name, email, number, id } = await req.json();
  await connectMongoDB();
  await Student.create({ name, email, number, id });

  return NextResponse.json(
    { message: "Student created successfully" },
    { status: 201 }
  );
}
