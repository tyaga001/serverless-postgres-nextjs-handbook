import { createPost } from "@/app/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { title, content, author, author_id, slug } = await req.json();

	try {
		await createPost({
			title,
			content,
			author,
			author_id,
			slug,
		});
		return NextResponse.json({ message: "Post created" }, { status: 201 });
	} catch (err) {
		return NextResponse.json(
			{ message: "An error occurred", err },
			{ status: 400 }
		);
	}
}