import { Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import {Blogs} from "./pages/Blogs"
import {Blog} from "./pages/Blog"
import {Publish} from "./pages/Publish"
import { Navigate } from "react-router-dom"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/blog/:id" element={<Blog/>} />
        <Route path="/publish" element={<Publish/>} />
        <Route path="/" element={<Navigate to="/signin" replace />} />
      </Routes>
    </div>
  )
}

export default App
