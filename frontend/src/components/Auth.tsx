import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupType } from "@aaydube/common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: ""
  });

  async function sendRequest(e: React.FormEvent) {
    e.preventDefault(); 
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      localStorage.setItem("name", response.data.name);
      navigate("/blogs");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="absolute top-7 left-8">
        <img src="/img1.svg" alt="Logo" className="h-5" />
      </div>
      <div className="w-full max-w-md space-y-2 md:space-y-6 bg-white p-6">
        <div>
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            {type === "signin"
              ? "What's your email and password?"
              : "Create an Account"}
          </h2>
        </div>
        <form onSubmit={sendRequest} className="space-y-4">
          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Aayush..."
              id="name"
              onChange={(e) =>
                setPostInputs({ ...postInputs, name: e.target.value })
              }
            />
          )}
          <LabelledInput
            label="Email"
            placeholder="johndoe@email.com"
            id="email"
            onChange={(e) =>
              setPostInputs({ ...postInputs, email: e.target.value })
            }
          />
          <LabelledInput
            label="Password"
            type="password"
            placeholder="123456"
            id="password"
            onChange={(e) =>
              setPostInputs({ ...postInputs, password: e.target.value })
            }
          />

          <div className="text-sm text-center">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              to={type === "signin" ? "/signup" : "/signin"}
              className="text-black font-semibold hover:underline ml-1"
            >
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            {type === "signup" ? "Sign up" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    id: string
}

function LabelledInput({ label, placeholder, onChange, type, id }: LabelledInputType) {
    return <div>
        <label className="block mb-1 text-sm text-black font-semibold">{label}</label>
        <input onChange={onChange} type={type || "text"} id={id} className="w-full p-3 mr-2 border border-gray-300  bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder={placeholder} required />
    </div>
}


