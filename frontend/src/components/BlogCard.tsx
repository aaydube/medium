import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`} className="block">
            <article className="p-4 md:p-6 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-200">
                <div className="flex items-center mb-3">
                    <Avatar name={authorName} />
                    <div className="font-medium text-sm ml-2">{authorName}</div>
                    <div className="mx-2">
                        <Circle />
                    </div>
                    <time className="text-gray-500 text-sm">
                        {publishedDate}
                    </time>
                    <div className="ml-2 gap-2 md:hidden flex items-center">
                        <Circle />
                        <span className="text-gray-500 text-sm">
                        {`${Math.ceil(content.length / 100)} min read`}
                    </span>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900 leading-snug">
                        {title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2">
                        {content.slice(0, 160) + "..."}
                    </p>
                </div>
                
                <div className="hidden md:flex items-center mt-4 text-sm">
                    <span className="text-gray-500">
                        {`${Math.ceil(content.length / 100)} min read`}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        Blog
                    </span>
                </div>
            </article>
        </Link>
    )
}

export function Circle() {
    return (
        <div className="h-1 w-1 rounded-full bg-gray-400"></div>
    )
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full ${size === "small" ? "w-8 h-8" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-sm" : "text-base"} font-medium text-gray-600`}>
                {name[0].toUpperCase()}
            </span>
        </div>
    )
}