import Link from "next/link";
import { getAllPosts } from "./db/actions";
import { formatDateString } from "./utils";

const getPosts = async () => await getAllPosts()

export default async function Home() {
	const posts = await getPosts()
	
	const shortenText = (text: string): string => {
		return text.length <= 55 ? text : text.slice(0, 55) + "...";
	};

	return (
		<div>
			<main className='md:px-8 py-8 px-4 w-full bg-white'>
				{posts?.map((post) => (
					<Link
					href={`/posts/${post.slug}`}
						
						className=' rounded w-full border-[1px] p-4 text-blue-500 hover:bg-blue-50 hover:drop-shadow-md transition-all duration-200 ease-in-out flex items-center justify-between gap-4 mb-4'

						key={post.id}
					>
						<h3
							className='text-lg font-semibold'
						>
							{shortenText(post.title)}
						</h3>
						<div className='flex items-center justify-between'>
							<p className="text-xs text-gray-500">{formatDateString(post?.created_at)}</p>
						</div>
					</Link>
				))}
			</main>
		</div>
	);
}