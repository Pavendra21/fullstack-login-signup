import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginCheck } from '../Service/Api'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

  //USESTATE

  const [formData, setFormData] = useState({

    email: '',
    password: ''

  })

  // Navigate

  const navigate = useNavigate()

  // Handle Change

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((prevData) => {
      return {

        ...prevData,
        [name]: value,
      }

    })

  }

  // Handle Submit 

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      // const response = await axios.post('http://localhost:8000/login',formData,{ withCredentials: true})
      const response = await loginCheck(formData)
      if (response.status === 200) {

        console.log(" login successfull")
        toast.success("login succesful")
        localStorage.setItem("isLoggedIn", "true");
        setTimeout(() => {
          navigate("/home")

        }, 1000)

      }

      else {
        console.log(" Unable to login")
      }

    }
    catch (error) {
      console.log(error)

    }
  }

  return (
    <>
      < ToastContainer />
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>

          {/* Email Field */}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
          <div className="flex justify-center mt-2">
            <Link className="underline underline-offset-1 text-blue-500 mr-1" to="/signup">Signup</Link>{" "}
            if not done
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;
