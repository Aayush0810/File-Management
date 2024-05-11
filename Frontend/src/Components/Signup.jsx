import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function SignupComponent() {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState({
    email: "",
    password: "",
  });

  const sendRequest = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup`, postInputs);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Error while signing up");
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>

            <div className="text-slate-400">
              "Already have an account?
              <Link className="pl-2 underline" to="/signin">
                Sign in
              </Link>
            </div>
          </div>

          <div className="pt-4">
            <LabelledInput
              label="Email"
              placeholder="viratkohli@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />

            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="******"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelledInput({ label, placeholder, onChange, type }) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
