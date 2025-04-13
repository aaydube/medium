import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Navbar = () => {
    const name = localStorage.getItem("name")

    return <div className="border-b border-gray-300  flex justify-between px-3 md:px-10 py-3">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
                <img src="/img1.svg" className="h-5" alt="" />
        </Link>
        <div className="flex items-center">
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">New</button>
            </Link>

            <Avatar size={"big"} name={name || "Anonymous" } />
        </div>
    </div>
}