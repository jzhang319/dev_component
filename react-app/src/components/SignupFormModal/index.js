import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { PasswordIcon, UserIcon, SignupIcon } from "../../exports";
import Email from "@mui/icons-material/Email";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div className="flex items-center justify-center bg-slate-300">
      <div className="p-6 space-y-8 rounded shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          <SignupIcon className="mr-2" />
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx} className="text-red-500">
                {error}
              </li>
            ))}
          </ul>
          <div>
            <label className="text-gray-700 ml-1 flex">
              <Email className="mr-2" />
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="text-gray-700 ml-1 flex">
              <UserIcon className="mr-2" />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="text-gray-700 ml-1 flex">
              <PasswordIcon className="mr-2" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="text-gray-700 ml-1 flex">
              <PasswordIcon className="mr-2" />
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-teal-600 rounded-md text-2xl hover:bg-yellow-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
