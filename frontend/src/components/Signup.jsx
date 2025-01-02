import React, { useState } from "react";
import * as Yup from "yup";
import {Link, useNavigate } from 'react-router-dom';
import {createProfile} from'../Service/Api'
import { ToastContainer, toast } from 'react-toastify';

 

const Signup = () => {

//Usesate

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    image: null, // Add image to formData
  });


  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .matches(/@gmail\.com$/, "Email must be a Gmail address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    image: Yup.mixed().required("Image is required"), // Add image validation
  });

  // Validation function
  const validateFormData = async (data) => {
    try {
      await validationSchema.validate(data, { abortEarly: false });
      return {}; // No errors
    } catch (validationErrors) {
      const errorObject = {};
      validationErrors.inner.forEach((error) => {
        errorObject[error.path] = error.message;
      });
      return errorObject;
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      // Handle file input
      setFormData({
        ...formData,
        image: files[0], // Only store the first selected file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validateFormData(formData);

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      try {
        // Create FormData to include the image
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value);
        });

        // Send the form data to the backend
        const response = await createProfile(formDataToSend)

        if (response.status === 200) {
          setSuccessMessage("Signup successful!");
          toast.success('Signup successful!')
          setTimeout(()=>{
            navigate("/login")

          },1000)
          console.log("Form submitted successfully");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          // Error from the server
          setErrors({ api: error.response.data.message || "Something went wrong!" });
          toast.error('something went wrong')
        } else {
          // Network or other error
          setErrors({ api: "Failed to submit form. Please try again later." });
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Signup
        </h2>
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Image Field */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          {/* API Error */}
          {errors.api && <p className="text-red-500 text-sm text-center">{errors.api}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center mt-2"><Link className="underline underline-offset-1 text-blue-500 mr-1" to="/login">Login</Link> if alredy register</div>

      </div>
    </div>
    </>
  );
};

export default Signup;
