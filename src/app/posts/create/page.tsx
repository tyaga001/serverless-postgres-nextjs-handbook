"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { slugifySentences } from "@/app/utils";
import { useUser } from "@clerk/nextjs";

export default function PostCreate() {
	const { isLoaded, user } = useUser();
	const [publishing, setPublishing] = useState<boolean>(false);
	const [content, setContent] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const router = useRouter();

	const onChangeContent = useCallback((value: string) => {
		setContent(value);
	}, []);

	if (!isLoaded) {
		return <p>Loading...</p>;
	}

	const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user?.username || !user.id) return;
		setPublishing(true);
		const request = await fetch("/api/posts/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				content,
				author: user?.username,
				author_id: user?.id,
				slug: slugifySentences(title),
			}),
		});
		const response = await request.json();
		setPublishing(false);
		alert(response.message);
		router.push("/")
	};

	return (
		<div className='min-h-[100vh]'>
			<main className='md:px-8 py-8 px-4 w-full'>
				<form className='flex flex-col w-full' onSubmit={handleCreatePost}>
					<label htmlFor='title' className='text-sm text-blue-600'>
						Title
					</label>
					<input
						type='text'
						name='title'
						id='title'
						value={title}
						required
						onChange={(e) => setTitle(e.target.value)}
						className=' px-4 py-3 border-2 rounded-md text-lg mb-4'
					/>

					<label htmlFor='content' className='text-sm text-blue-600'>
						Content
					</label>
					<SimpleMDE value={content} onChange={onChangeContent} id='content' />

					<button
						type='submit'
						disabled={publishing}
						className='bg-blue-600 mt-2 text-white py-3 rounded-md'
					>
						{publishing ? "Publishing....please wait" : "Publish Post"}
					</button>
				</form>
			</main>
		</div>
	);
}