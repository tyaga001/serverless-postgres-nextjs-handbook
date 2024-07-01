
import { deletePost } from "@/app/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
	const { id } = await req.json();

	try {
       await deletePost(id)
		return NextResponse.json({ message: "Deleted!" }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ message: "Error occured!", err },
			{ status: 400 }
		);
	}
}