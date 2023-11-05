import connectMongoDB from "@/lib/mongodb";
import Student from "@/models/students";
import { NextRequest, NextResponse } from "next/server";

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   const { newEmail: email } = await req.json();
//   await connectMongoDB();

//   await Student.findByIdAndUpdate(id, { email });

//   return NextResponse.json(
//     { message: "Email updated successfully" },
//     { status: 200 }
//   );
// }

export async function PUT(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params;
  const { newUniqueId: uniqueId } = await req.json();
  await connectMongoDB();

  await Student.findByIdAndUpdate(email, { uniqueId });

  return NextResponse.json(
    { message: "Email and unique ID updated successfully" },
    { status: 200 }
  );
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectMongoDB();

  const student = await Student.findOne({ _id: id });

  return NextResponse.json({ student }, { status: 200 });
}
