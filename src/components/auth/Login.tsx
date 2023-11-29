import React, { useEffect, useState } from "react";
import {
  LOGIN_LABEL_USER,
  LOGIN_LABEL_PASS,
  LOGIN_TEXT,
  LOGIN_BTN_SUBMIT,
  LOGIN_BTN_FORGOT,
} from "../../utils/constants/constants";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  // State to store input data
  const [userInputData, setUserInputData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // Function to handle input changes
  const setInputChange = (field: string, value: string) => {
    setUserInputData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Submitted", userInputData);
    navigate("/");
  };

  useEffect(() => {
    console.log(userInputData);
  }, [userInputData]);

  return (
    <div className="flex h-screen">
      {/* Left Section (40%) */}
      <div className="bg-gradient-to-r w-1/3 from-blue-500 to-cyan-500 p-10">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col justify-center">
            <h3 className="text-white text-2xl font-bold">Logo</h3>
          </div>
        </div>
      </div>

      {/* Right Section (60%) */}
      <div className="flex-1 bg-gradient-to-r from-white via-gray-300 to-gray-500 p-7">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-left mb-10">
            <h1 className="text-5xl from-neutral-900 font-sans">
              {LOGIN_TEXT}
            </h1>
          </div>
          <form className="w-full max-w-md">
            {" "}
            {/* Increased max-width for the form */}
            {/* Form fields go here */}
            <div className="mb-4">
              <input
                type="text"
                id="username"
                placeholder={LOGIN_LABEL_USER}
                name="username"
                onChange={(e) => setInputChange("username", e.target.value)}
                className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500 h-14"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setInputChange("password", e.target.value)}
                placeholder={LOGIN_LABEL_PASS}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 h-14"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                onClick={handleSubmit}
              >
                {LOGIN_BTN_SUBMIT}
              </button>
              <a
                href="/forgot-password"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                {LOGIN_BTN_FORGOT}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
