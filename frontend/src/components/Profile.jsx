import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {getProfile,deleteProfile,updateProduct} from '../Service/Api'
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
    const [data, setData] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await  getProfile();
                setData(response.data.user);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchUserData();
    }, []);

    //
    const productId = data._id

    const handleDeleteClick = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this account?');
        if (!confirmDelete) return;

        try {
            const response = await deleteProfile(productId) ;
            if (response.status === 200) {
                 toast.success("Account deleted successfully !!")
                 localStorage.removeItem("isLoggedIn");
                 window.location.reload();
                 setTimeout(()=>{

                     navigate("/home"); // Navigate to login after deletion

                 },1000)
            }
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    const handleEditClick = () => {
        setEditFormData(data);
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProduct(productId,editFormData);
            if (response.status === 200) {
                setData(response.data.user);
                setIsEditing(false);
                alert("Profile updated successfully");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <><ToastContainer/>
            <div className="flex justify-center bg-gray-100">
                <div className="mr-3 p-1 mt-3 bg-blue-400 rounded-lg text-white hover:text-black cursor-pointer">
                    <Link to="/home">Home</Link>
                </div>
                <div className="ml-3 mr-3 p-1 mt-3 bg-blue-400 rounded-lg text-white hover:text-black cursor-pointer">
                    <Link to="/profile">Profile</Link>
                </div>
            </div>

            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                {!isEditing ? (
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">{data.name}</h2>
                            <p className="text-gray-600">{data.email}</p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Name: {data.name}</label>
                            </div>
                            <div>
                                <label className="block text-gray-700">Email: {data.email}</label>
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number: {data.phone}</label>
                            </div>
                            <div>
                                <label className="block text-gray-700">Password: {data.password}</label>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6 space-x-4">
                            <button
                                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={handleEditClick}
                            >
                                Edit
                            </button>
                            <button
                                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none"
                                onClick={handleDeleteClick}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ) : (
                    <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg" onSubmit={handleEditSubmit}>
                        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit Profile</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editFormData.name || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={editFormData.email || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={editFormData.phone || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="password"
                                name="password"
                                value={editFormData.password || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Save
                        </button>
                    </form>
                )}
            </div>
        </>
    );
};

export default Profile;
