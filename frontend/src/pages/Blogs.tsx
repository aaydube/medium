import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/Skeleton";
import {Navbar} from "../components/Navbar";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Navbar/>
            <div  className="flex justify-center">
                <div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Navbar />
            <div className="flex justify-center w-full">
                <div className="max-w-screen-lg w-full">
                {blogs.map((blog, index) => <BlogCard
                    key={index}
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
                </div>
            </div>
        </div>
}

