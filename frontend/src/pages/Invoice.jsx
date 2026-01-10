import React, { useState, useMemo, useCallback, useEffect } from "react";
import HeaderDashboard from "../components/Dashboard/HeaderDashboard.jsx";
import { InvoicePreview } from "./InvoicePreview.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const InvoiceItem = React.memo(({ item, index, handleItemChange, removeItem }) => (
    <>
        <div className="grid grid-cols-4 gap-4 items-center mb-4 mt-4">
            <div className="flex flex-col">
                <label htmlFor={`description-${index}`} className="text-sm font-medium text-gray-300 mb-1">
                    Item Name
                </label>
                <input
                    id={`description-${index}`}
                    type="text"
                    name="description"
                    placeholder="Item"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                    className="p-2 bg-gray-800 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor={`quantity-${index}`} className="text-sm font-medium text-gray-300 mb-1">
                    Quantity
                </label>
                <input
                    id={`quantity-${index}`}
                    type="number"
                    name="quantity"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    className="p-2 bg-gray-800 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor={`price-${index}`} className="text-sm font-medium text-gray-300 mb-1">
                    Price
                </label>
                <input
                    id={`price-${index}`}
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                    className="p-2 bg-gray-800 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                onClick={() => removeItem(index)}
                className="mt-6 cursor-pointer bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 flex items-center justify-center transition-all"
            >
                🗑️
            </button>
        </div>

        <div className="flex flex-col">
            <label
                htmlFor={`descp-${index}`}
                className="text-sm font-medium text-gray-300 mb-1"
            >
                Description
            </label>
            <input
                id={`descp-${index}`}
                type="text"
                name="desc"
                value={item.desc}
                placeholder="Description"
                onChange={(e) => handleItemChange(index, e)}
                className="p-2 w-full bg-gray-800 rounded-md text-white focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <hr className="m-2 border-gray-700" />
    </>
));


function Invoice() {
    const location = useLocation();
    const passedData = location.state?.invoiceData;
    const view = location.state?.view;

    const [invoice, setInvoice] = useState(
        passedData ? {
            ...passedData,
            invoiceDate: passedData.invoiceDate ? new Date(passedData.invoiceDate).toISOString().split("T")[0] : "",
            dueDate: passedData.dueDate ? new Date(passedData.dueDate).toISOString().split("T")[0] : "",
        } : {
            invoiceNumber: "INV-2025-0001",
            invoiceDate: "",
            dueDate: "",
            clientName: "",
            clientEmail: "",
            clientAddress: "",
            items: [{ description: "", quantity: 0, price: 0, desc: "" },

            ],
            tax: 0,
            discount: 0,
            companyName: "",
            companyAddress: "",
        });




    const [showPreview, setShowPreview] = useState(false);
    const [showDummyData, setShowDummyData] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");


    useEffect(() => {
        if (passedData && view) {
            setShowPreview(true);

            const previewSection = document.getElementById('show');
            if (previewSection) {
                previewSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',  // Aligns the element to the top of the viewport
                    inline: 'nearest'
                });

            }
        }

    }, [passedData, view]);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await axios.get("/api/v1/user/session", {
                    withCredentials: true,
                });

                if (!data.data) {
                    console.log("1")
                    navigate("/login");
                } else {
                    console.log("2")
                    setUser(data.data.user);
                }

            } catch (error) {
                console.log("User not Logged In");
                navigate('/login')
            }
        };

        checkSession();
    }, [navigate]);



    // Generic Input Handler
    const handleChange = useCallback((e) => {
        setInvoice((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }, []);

    const handleItemChange = useCallback((index, e) => {
        const { name, value } = e.target;
        setInvoice((prev) => {
            const newItems = [...prev.items];
            newItems[index] = {
                ...newItems[index],
                [name]: value,
            };
            return { ...prev, items: newItems };
        });
    }, []);


    // Add and Remove Items
    const addItem = useCallback(() => {
        setInvoice((prev) => ({
            ...prev,
            items: [...prev.items, { description: "", quantity: 1, price: 0 }],
        }));
    }, []);

    const removeItem = useCallback((index) => {
        setInvoice((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));
    }, []);




    // Calculate Total with Memoization
    const totalAmount = useMemo(() => {
        const subtotal = invoice.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        const taxAmount = invoice ? (subtotal * invoice.tax) / 100 : 0;
        const discountAmount = (subtotal * invoice.discount) / 100;
        return subtotal + taxAmount - discountAmount;
    }, [invoice.items, invoice.tax, invoice.discount]);

    const formatCurrency = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

    const fillDummyData = () => {
        const invoiceDate = new Date();
        const dueDate = new Date(invoiceDate); // Create a copy of invoiceDate
        dueDate.setDate(dueDate.getDate() + 5); // Add 5 days

        setShowDummyData(false)
        setInvoice({
            invoiceNumber: "INV-2025-1234",
            invoiceDate: invoiceDate.toISOString().split('T')[0],
            dueDate: dueDate.toISOString().split('T')[0],
            clientName: "John Doe",
            clientEmail: "johndoe@example.com",
            clientAddress: "456 Park Avenue, New Delhi, India",
            items: [
                { description: "Website Design", quantity: 1, price: 2000, desc: "Full website UI/UX design" },
                { description: "Hosting Service", quantity: 1, price: 5000, desc: "1-year web hosting" }
            ],
            tax: 30,
            discount: 10,
            companyName: "Tech Solutions Pvt Ltd",
            companyAddress: "789 Business Road, Bangalore, India",
        });
    };

    const handleSubmit = async () => {
        console.log(invoice);
        setErrorMsg("");

        try {
            if (!user || !user._id) {
                alert("User not authenticated");
                return;
            }

            const payload = {
                ...invoice,
                userId: user._id,
                userName: user.name,
                userEmail: user.email,
            }

            console.log(invoice)


            const response = await axios.post("/api/v1/invoice/create-invoice", invoice, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            console.log("test1")
            console.log("hello", response.data)

            if (response.data.message == "Duplicate Invoice Number") {
                setErrorMsg("*Invoice with Same Invoice Number Already Exists*")
            }

            else if (response.data.message == "All Items Not Given") {
                setErrorMsg("*All Fields are Not Filled*")
            }

            else if (response.data.message == "Atleast 1 Item is required") {
                setErrorMsg("*Atleast 1 Item is required*")
            }

            else {

                setErrorMsg("*Invoice Created Successfully*")

                console.log("Invoice Created Successfully", response.data);

            }


        } catch (error) {
            console.error("Error creating invoice:", error);

        }
    };


    const emptyDummyData = () => {
        setShowDummyData(true)
        setInvoice({
            invoiceNumber: "",
            invoiceDate: "",
            dueDate: "",
            clientName: "",
            clientEmail: "",
            clientAddress: "",
            items: [
                { description: "", quantity: 0, price: 0 },
                { description: "", quantity: 0, price: 0 }
            ],
            tax: 0,
            discount: 0,
            companyName: "",
            companyAddress: "",
        });
    }

    return (
        <>
            <HeaderDashboard />
            <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">Create Invoice</h2>
                {/* Company Information */}
                <div className="pl-0 p-4 rounded-lg" >
                    <h3 className="text-xl font-semibold mb-3">Company Information:</h3>
                    <label htmlFor="">Company Name:</label>
                    <input type="text" name="companyName" value={invoice.companyName} onChange={handleChange} className="w-full p-2 mb-2 bg-gray-800 rounded-md" />
                    <label htmlFor="">Company Address:</label>
                    <input type="text" name="companyAddress" value={invoice.companyAddress} onChange={handleChange} className="w-full p-2 mb-4 bg-gray-800 rounded-md" />
                    <label htmlFor="">Invoice Number:</label>
                    <input type="text" name="invoiceNumber" value={invoice.invoiceNumber} onChange={handleChange} className="w-full p-2 bg-gray-800 rounded-md" />
                </div>

                {/* Invoice Details */}
                <div className="pl-0 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Invoice Dates:</h3>
                    <label htmlFor="">Date of Invoice:</label>
                    <input type="date" name="invoiceDate" value={invoice.invoiceDate} onChange={handleChange} className="w-full mb-4 p-2 bg-gray-800 rounded-md" />
                    <label htmlFor="">Due Date:</label>
                    <input type="date" name="dueDate" value={invoice.dueDate} onChange={handleChange} className="w-full p-2 mb-4 bg-gray-800 rounded-md" />
                </div>

                {/* Client Info */}
                <h3 className="text-xl font-semibold mt-3 mb-2">Client Information</h3>
                <label htmlFor="">Client Name:</label>
                <input type="text" name="clientName" value={invoice.clientName} onChange={handleChange} className="w-full p-2 mb-2 bg-gray-800 rounded-md" />
                <label htmlFor="">Client Email:</label>
                <input type="email" name="clientEmail" value={invoice.clientEmail} onChange={handleChange} className="w-full p-2 mb-2 bg-gray-800 rounded-md" />
                <label htmlFor="">Client Address:</label>
                <input type="text" name="clientAddress" value={invoice.clientAddress} onChange={handleChange} className="w-full p-2 mb-4 bg-gray-800 rounded-md" />

                {/* Items */}
                {/* implement as a table with rows & cols */}
                <h3 className="text-xl font-semibold mt-6 mb-2">Items</h3>
                {invoice.items.map((item, index) => (
                    <InvoiceItem key={index} item={item} index={index} handleItemChange={handleItemChange} removeItem={removeItem} />
                ))}
                <button onClick={addItem} className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-4 py-2 rounded-md mt-2">Add Item</button>

                {/* Tax & Discount */}
                <h3 className="text-xl font-semibold mt-6 mb-2">Tax & Discount</h3>
                <label htmlFor="">Tax (in %)</label>
                <input type="number" name="tax" value={invoice.tax} onChange={handleChange} className="w-full p-2 mb-2 bg-gray-800 rounded-md" />
                <label htmlFor="">Discount (in %)</label>
                <input type="number" name="discount" value={invoice.discount} onChange={handleChange} className="w-full p-2 mb-4 bg-gray-800 rounded-md" />

                {/* Total */}
                <h3 className="text-xl font-semibold mt-6">Total: <span className="text-green-400">{formatCurrency(totalAmount)}</span></h3>

                {/* Buttons */}
                <div className="mt-6 flex justify-center gap-10">
                    <button onClick={() => setShowPreview(!showPreview)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 cursor-pointer rounded-md">
                        {showPreview ? "Hide Preview" : "Preview Invoice"}</button>
                    <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer px-4 py-2 rounded-md" onClick={showDummyData ? fillDummyData : emptyDummyData}>
                        {showDummyData ? "Show Dummy Data" : "Hide Dummy Data"}
                    </button>
                    <button
                        className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-4 py-2 rounded-md"
                        onClick={handleSubmit}
                    >Save Invoice</button>

                </div>
                <p className="text-red-500 mt-10">{errorMsg}</p>
            </div>

            <div id="show">
                {showPreview &&
                    <InvoicePreview key={invoice.invoiceNumber} {...invoice} totalAmount={totalAmount} />}
            </div >

            <Footer />

        </>
    );
}


export default Invoice;
