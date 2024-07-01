"use client";
import { useRouter, useParams } from "next/navigation";
import ReactMarkdown from 'react-markdown'
import { useEffect, useState, useCallback } from 'react';
import remarkGfm from 'remark-gfm'
import { formatDateString } from "@/app/utils";
import { useUser } from "@clerk/nextjs";

export default function Post() {
	const router = useRouter();
	const { isLoaded, user } = useUser();
	const [loading, setLoading] = useState<boolean>(true);
	const [post, setPost] = useState<Post | null>(null);
	const params = useParams<{ slug: string }>()

	const fetchPostDetails = useCallback(async () => {
		const request = await fetch("/api/posts/single", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ slug: params.slug})
		})

		const { data } = await request.json()
		if (data) {
			setPost(data)
			setLoading(false)
		}
	}, [params.slug])

	useEffect(() => {
		fetchPostDetails()	
	}, [fetchPostDetails]);

	if (loading || !isLoaded) {
		return (
			<div>
				<p>Loading...</p>
			</div>
		);
	}

	const deletePost = async () => {
		if (confirm("Are you sure you want to delete this post?")) {
			const request = await fetch("/api/posts/delete", {
				method: "DELETE",
				headers: {
				"Content-Type": "application/json",
			},
				body: JSON.stringify({ id: post?.id })
			})
			const {message} = await request.json()
			alert(message)
			router.push("/")
		}
	};

	return (
		<div>
			<main className='w-full md:px-8 px-4'>
				<header className='mb-6 py-4'>
					<div className="flex items-center justify-between  mb-2">
						<h2 className='text-3xl text-blue-700 font-bold'>
						{post?.title}
						</h2>
						{user?.id === post?.author_id && (
							<div className="flex items-center">
							<button className="px-4 py-2 rounded text-xs bg-red-200 hover:bg-red-40 mr-3" onClick={() => deletePost()}>Delete</button>
						</div>

						)}
						
					</div>
					
					<div className='flex'>
						<p className='text-red-500 mr-8 text-sm'>
							Author: <span className='text-gray-700'>{post?.author}</span>
						</p>
						<p className='text-red-500 mr-6 text-sm'>
							Posted on: <span className='text-gray-700'>{formatDateString(post?.created_at!)}</span>
						</p>
					</div>
					
				</header>

				<div className="text-sm text-justify">
					<ReactMarkdown remarkPlugins={[remarkGfm]} >
						{post?.content!}
					</ReactMarkdown>
					
				</div>
			</main>
		</div>
	);
}