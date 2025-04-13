import { Blog } from "../hooks";
import { Navbar } from "./Navbar";
import { Avatar } from "./BlogCard"; 

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="flex justify-center px-4 sm:px-6 md:px-10 py-10">
        <div className="w-full max-w-screen-xl grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Blog Content */}
          <div className="md:col-span-8">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              {blog.title}
            </h1>
            <p className="text-sm text-gray-500 pt-2">
              Posted on 2nd December 2023
            </p>
            <article className="pt-6 leading-relaxed text-lg font-serif text-gray-800 whitespace-pre-line">
              {blog.content}
            </article>
          </div>

          {/* Author Info */}
          <aside className="md:col-span-4">
            <h2 className="text-gray-600 text-lg font-semibold mb-4">
              About the Author
            </h2>
            <div className="flex items-start">
              <Avatar size="big" name={blog.author.name || "Anonymous"} />
              <div className="ml-4">
                <p className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </p>
                <p className="pt-2 text-sm text-gray-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
