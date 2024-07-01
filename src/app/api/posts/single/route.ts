
import { getSinglePost } from "@/app/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { slug } = await req.json();

	try {
		const data = await getSinglePost(slug)
		return NextResponse.json({ message: "Post fetched", data }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ message: "Post not available", err },
			{ status: 400 }
		);
	}
}