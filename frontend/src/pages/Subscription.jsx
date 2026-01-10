import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import HeaderDashboard from "../components/Dashboard/HeaderDashboard";
import {useNavigate } from "react-router-dom";
import axios from "axios";

function Subscription() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const statusOptions = ["Pending", "Paid"];
    const debounceTimeout = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await axios.get("/api/v1/user/session", {
                    withCredentials: true,
                });

                console.log(data.data);

                if (!data.data) {
                    navigate("/login");
                } else {
                    setUser(data.data.user);
                }

            } catch (error) {
                console.log("User not Logged In");
                navigate('/login')
            }
        };

        checkSession();
    }, [navigate]);


    useEffect(() => {
        if (!user) return;

        const fetchInvoices = async () => {
            try {
                if (!user) {
                    alert("User is not Authenticated");
                    return;
                }

                console.log("test4")
                const response = await axios.get("/api/v1/invoice/invoices");
                setSubscriptions(response.data.data);
            } catch (error) {
                console.error("Error fetching invoices:", error);
                setError("Failed to load invoices. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, [user]);

    const handleStatusChange = (id, newStatus) => {
        setSubscriptions((prevSubscriptions) =>
            prevSubscriptions.map((sub) =>
                sub._id === id ? { ...sub, status: newStatus } : sub
            )
        );

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(async () => {
            try {
                await axios.put(`/api/v1/invoice/update-status/${id}`, { status: newStatus });
                console.log(`Status updated for Invoice ${id} to ${newStatus}`);
            } catch (error) {
                console.error("Failed to update status:", error);
                alert("Error updating status. Please try again.");
            }
        }, 500); 
    };

    const formatToDDMMYY = (isoDate) => {
        const date = new Date(isoDate);
        return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
            .toString().padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`;
    };

    const totalPrice = (items) => items.reduce((total, item) => total + item.price, 0);

    const handleDeleteInvoice = async (id) => {
        try {
            await axios.delete(`/api/v1/invoice/delete-invoice/${id}`);
            setSubscriptions((prev) => prev.filter((sub) => sub._id != id));
            alert("Invoice Deleted Successfully");
        } catch (error) {
            console.error("Error Deleting Invoice", error);
            alert("Falied to delete the invoice, try again !")

        }
    }

    const handleUpdateInvoice = async (sub, view) => {
        navigate('/invoice', { state: { invoiceData: sub, view: view } })
    }

    return (
        <>
            <HeaderDashboard />
            <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
                <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">History</h2>

                <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg mt-6 border border-gray-700">
                    <h2 className="text-base md:text-2xl font-semibold mb-4 text-yellow-300">💳 History of Invoices: </h2>

                    <div className="overflow-x-auto ">
                        <table className="w-full border-collapse text-sm md:text-base">
                            <thead>
                                <tr className="bg-gray-700 text-gray-300">
                                    <th className="p-2 md:p-4 text-left whitespace-nowrap">S.No.</th>
                                    <th className="p-2 md:p-4 text-left whitespace-nowrap">Invoice No.</th>
                                    <th className="p-2 md:p-4 text-left whitespace-nowrap">Client Name</th>
                                    <th className="p-2 md:p-4 text-left whitespace-nowrap">Due Date</th>
                                    <th className="p-2 md:p-4 text-left whitespace-nowrap">Amount</th>
                                    <th className="p-2 md:p-4 text-left whitespace-nowrap">Status</th>
                                    <th className="p-2 md:p-4 text-left whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {subscriptions.length === 0 && (
                                    <tr className>
                                        <td></td>
                                        <td></td>

                                        <td colSpan={2}>No Invoices Saved Yet </td>
                                    </tr>
                                )}

                                {subscriptions.map((sub, index) => (
                                    <tr key={sub._id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                                        <td className="p-2 md:p-4">{index + 1}</td>
                                        <td className="p-2 md:p-4">{sub.invoiceNumber}</td>
                                        <td className="p-2 md:p-4">{sub.clientName}</td>
                                        <td className="p-2 md:p-4">{formatToDDMMYY(sub.dueDate)}</td>
                                        <td className="p-2 md:p-4">₹{totalPrice(sub.items) || "N/A"}</td>
                                        <td className="p-2 md:p-4">
                                            <select
                                                className={`p-1 rounded ${sub.status === "Pending" ? "bg-red-700 text-white" : "bg-green-700 text-white"
                                                    }`}
                                                value={sub.status}
                                                onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                                            >
                                                {statusOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-2 md:p-4">
                                            <button
                                                className=" cursor-pointer text-white px-2 py-1 rounded hover:bg-gray-600 transition"
                                                onClick={() => handleDeleteInvoice(sub._id)}
                                            >
                                                ❌
                                            </button>
                                            <button
                                                className=" cursor-pointer text-white px-2 py-1 rounded hover:bg-gray-600 transition"
                                                onClick={() => handleUpdateInvoice(sub, false)}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className=" cursor-pointer text-white px-2 py-1 rounded hover:bg-gray-600 transition"
                                                onClick={() => handleUpdateInvoice(sub, true)}
                                            >
                                                👁️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
}

export default Subscription;
