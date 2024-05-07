import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { EmailIcon, LoginIcon, PasswordIcon } from "../../exports";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-6 space-y-8 bg-slate-300 shadow-lg w-96 ">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          <LoginIcon className="mr-2" />
          Log In
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
              <EmailIcon className="mr-2" />
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
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-teal-600 rounded-md text-2xl hover:bg-yellow-500"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
