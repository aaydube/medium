import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Navbar } from "../components/Navbar";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center w-full pt-10 px-4">
        <div className="max-w-screen-lg w-full p-6">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title your story"
            className="w-full text-2xl sm:text-3xl font-bold text-gray-800 placeholder-gray-400 bg-transparent border-b-2 border-gray-300 focus:border-green-600 focus:outline-none transition-all duration-300 mb-8"
          />

          <TextEditor
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <div className="flex justify-end mt-8 space-x-3">
            <button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/blogs/post`,
                  {
                    title,
                    content: description,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              }}
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors duration-150 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="mt-6">
      <div className="w-full mb-4">
        <div className="flex items-start">
          <div className="w-full">
            <textarea
              onChange={onChange}
              id="editor"
              rows={12}
              className="w-full resize-none rounded-lg p-3 md:p-6 text-gray-800 font-serif text-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 shadow-sm transition-all duration-300"
              placeholder="Tell your story..."
              required
              style={{ minHeight: "320px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
