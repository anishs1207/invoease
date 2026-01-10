import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Admin() {
    const [notifications, setNotifications] = useState([]);
    const [inputs, setInputs] = useState({ alertText: "", emoji: "" });
    const [isLoading, setIsLoading] = useState(true); // New state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("/api/v1/admin/all-notifications");
                console.log("Notifications fetched:", response.data.data);
                setNotifications(response.data.data);
                setIsLoading(false); // Set loading fals
            } catch (error) {
                navigate('/home')
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
        // const interval = setInterval(fetchNotifications, 5000);
        // return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/v1/admin/send-notifications", inputs);
            console.log("Notification sent:", response.data);

            // Update state with the new notification
            setNotifications((prev) => [...prev, response.data.data]);

            // Clear input fields
            setInputs({ alertText: "", emoji: "" });
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    };

    const handleDelete = async (alertText) => {
        try {
            await axios.delete(`/api/v1/admin/delete-notification/${alertText}`);

            // Remove the deleted notification from state
            setNotifications((prev) => prev.filter((notification) => notification.alertText !== alertText));
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    if (isLoading) {
        return <div className="text-white text-center mt-10">Checking Authorization...</div>; // Placeholder before UI renders
    }


    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">
                Admin Panel (Notifications)
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="alertText" className="text-sm font-medium text-gray-300 mb-1">
                        Notification Text
                    </label>
                    <input
                        id="alertText"
                        name="alertText"
                        type="text"
                        value={inputs.alertText}
                        onChange={handleChange}
                        placeholder="Enter Notification Text"
                        className="p-2 bg-gray-800 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="emoji" className="text-sm font-medium text-gray-300 mb-1">
                        Select Emoji
                    </label>
                    <select
                        id="emoji"
                        name="emoji"
                        value={inputs.emoji}
                        onChange={handleChange}
                        className="p-2 bg-gray-800 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select an Emoji</option>
                        <option value="🔔">🔔</option>
                        <option value="💰">💰</option>
                        <option value="📢">📢</option>
                        <option value="📦">📦</option>
                        <option value="🎉">🎉</option>
                        <option value="⚠️">⚠️</option>
                        <option value="✉️">✉️</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md mt-4 transition-all"
                >
                    Send to All
                </button>
            </form>

            <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-2">Sent Notifications</h3>
                {notifications.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-800 text-white border border-gray-700">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="py-2 px-4 border-b">S.No</th>
                                    <th className="py-2 px-4 border-b">Date</th>
                                    <th className="py-2 px-4 border-b">Notification Text</th>
                                    <th className="py-2 px-4 border-b">Emoji</th>
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notifications.map((notification, index) => (

                                    < tr key={notification._id} className="text-center border-b border-gray-700" >
                                        {console.log(notification._id)}
                                        <td className="py-2 px-4">{index + 1}</td>
                                        <td className="py-2 px-4">{new Date(notification.date).toLocaleDateString()}</td>
                                        <td className="py-2 px-4">{notification.alertText}</td>
                                        <td className="py-2 px-4">{notification.icon}</td>
                                        <td className="py-2 px-4 cursor-pointer text-red-600 hover:bg-gray-700"
                                            onClick={() => handleDelete(notification.alertText)}
                                        >
                                            ❌
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400">No notifications available.</p>
                )}
            </div>
        </div >
    );
}

export default Admin;
