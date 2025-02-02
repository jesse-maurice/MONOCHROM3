/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import {
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';
import {
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import SignUpImg from '../../assets/images/signup image.webp';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Check if the email contains 'test'
    if (email.toLowerCase().includes("test")) {
      setError("Sign up with a valid email address");
      return; // Exit the function
    }

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error(error);
      // Custom error messages based on Firebase error codes
      switch (error.code) {
        case "auth/invalid-email":
          setError("The email address is not valid.");
          break;
        case "auth/email-already-in-use":
          setError("This email address is already in use.");
          break;
        case "auth/weak-password":
          setError("The password is too weak.");
          break;
        default:
          setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="relative w-full h-screen bg-zinc-900/80">
        <img
          className="absolute object-cover w-full h-full mix-blend-overlay"
          src={SignUpImg}
          alt="/"
        />

        <div className="absolute inset-0 flex items-center justify-center h-full">
          <form
            className="max-w-[400px] rounded-xl w-full mx-auto bg-white p-8"
            onSubmit={handleSignUp}
            noValidate
          >
            <h2 className="py-4 text-4xl font-bold text-center font-high">
              MONOCHROME.
            </h2>

            {/* Error Message */}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="flex flex-col gap-3 mt-5 mb-4 font-semibold font-jakarta">
              <label>Full Name</label>
              <input
                className="relative rounded-lg p-2 bg-gray-100 border focus:outline-black font-light text-[#7f7f7f] solid"
                type="text"
                name="fullName"
                placeholder="full name"
                autoComplete="off"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-3 mt-5 mb-4 font-semibold font-jakarta">
              <label htmlFor="email">Email</label>
              <input
                className="relative p-2 rounded-lg bg-gray-100 border font-light focus:outline-black text-[#7f7f7f] solid"
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-3 mb-4 font-semibold font-jakarta">
              <label htmlFor="password">Password</label>
              <div className="relative flex password-container place-items-center">
                <input
                  className="  flex-1 p-2 bg-gray-100 rounded-lg border font-light text-[#7f7f7f] focus:outline-black solid"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  pattern=".{7,}"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEye
                    onClick={togglePasswordVisibility}
                    className="absolute cursor-pointer right-4"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={togglePasswordVisibility}
                    className="absolute cursor-pointer right-4"
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-8 rounded-lg font-semibold font-jakarta bg-[#ef5350] hover:bg-[#be4341] text-white"
            >
              Sign Up
            </button>

            <p className="mt-8 text-center font-medium font-jakarta text-[#7f7f7f]">
              Already a member?
              <span className="font-medium text-[#ef5350]">
                <Link to="/login"> Log in</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
