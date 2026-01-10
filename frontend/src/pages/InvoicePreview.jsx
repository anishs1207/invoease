import React, { useEffect, useState, useRef } from "react";
import { jsPDF } from "jspdf";
import domtoimage from "dom-to-image-more";

export function InvoicePreview({
    companyName,
    companyAddress,
    invoiceNumber,
    invoiceDate,
    dueDate,
    clientName,
    clientEmail,
    clientAddress,
    items,
    tax,
    discount,
    themeColor,
    description,
    setThemeColor
}) {
    const invoiceRef = useRef();

    const [loading, setLoading] = useState(false);

    const generatePDF = () => {
        setLoading(true);
        const input = invoiceRef.current;

        // Convert input fields to text to prevent boxes
        input.querySelectorAll("input, textarea").forEach(el => {
            const span = document.createElement("span");
            span.innerText = el.value;
            el.parentNode.replaceChild(span, el);
        });

        domtoimage.toPng(input, {
            quality: 1,
            bgcolor: "white",
            style: {
                border: "none",
                outline: "none",
                boxShadow: "none",
                transform: "scale(3)",
                transformOrigin: "top left",
                borderCollapse: "collapse"
            },
            width: input.clientWidth * 3,
            height: input.clientHeight * 3,
            scale: 3,
        })
            .then((dataUrl) => {
                const pdf = new jsPDF("p", "mm", "a4");
                const imgWidth = 190;
                const imgHeight = (input.clientHeight * imgWidth) / input.clientWidth;

                pdf.addImage(dataUrl, "PNG", 10, 10, imgWidth, imgHeight);
                pdf.save(`Invoice_${invoiceNumber}.pdf`);
            })
            .catch(error => console.error("Error generating PDF:", error))
            .finally(() => setLoading(false));
    };



    const [style, setStyle] = useState("text-red-600");

    const calculateTotal = () => {
        const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        const discountAmount = (discount / 100) * subtotal;
        const taxableAmount = subtotal - discountAmount;
        const taxAmount = (taxableAmount * tax) / 100;
        const total = taxableAmount + taxAmount;

        return { subtotal, discountAmount, total };
    };

    const { subtotal, discountAmount, total } = calculateTotal();

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">Invoice Preview</h2>
            <div className="flex justify-center">
                {/* Color Selector Dropdown */}
                <div className="mb-4 text-center mr-5">
                    {/* <label className="mr-2 font-semibold">Select Theme Color:</label> */}
                    {/* <select
                        className="p-2 rounded bg-gray-800 text-white"
                        value={themeColor}
                        onChange={(e) => {
                            setThemeColor(e.target.value)
                        }}
                    >
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                    </select> */}
                </div>
            </div>

            {/* Invoice Preview */}
            <div ref={invoiceRef} className="bg-white text-black  no-border p-6 rounded-lg border border-gray-300 shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        {/* <h2 className={`text-xl font-bold ${style}`}>{companyName}</h2> */}
                        <h2 className={`text-xl font-bold `}>{companyName}</h2>
                        <p className="text-sm">{companyAddress}</p>
                    </div>
                    <div className="text-right">
                        {/* <h2 className={`text-2xl font-bold ${style}`}>INVOICE</h2> */}
                        <h2 className={`text-2xl font-bold`}>INVOICE</h2>
                        <p className="text-sm"># {invoiceNumber}</p>
                    </div>
                </div>

                {/* Bill To / Ship To */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                        <p className="font-semibold">Bill To:</p>
                        {/* <p className={`text-red-600 font-bold`}>{clientName}</p> */}
                        <p className={`text-black font-bold`}>{clientName}</p>
                        <p>{clientAddress}</p>
                        <p>{clientEmail}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Due Date:</p>
                        <p>{dueDate || "Not specified"}</p>
                    </div>
                </div>

                {/* Invoice Details */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <p><strong>Invoice Date:</strong> {invoiceDate}</p>
                    <p>{ }</p>
                    <p><strong>Terms:</strong> Due on Receipt</p>
                </div>

                {/* Items Table */}
                <table className="w-full border-collapse border border-gray-400 text-sm mb-6">
                    <thead>
                        <tr className={`bg-${themeColor}-500 text-black text-center bg-gray-300`}>
                            <th className=" p-2">S.No.</th>
                            <th className="p-2 ">Item & Description</th>
                            <th className="p-2">Qty</th>
                            <th className="p-2">Rate</th>
                            <th className="p-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`border border-gray-300 text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                                >
                                    <td className="border border-gray-400 p-2">{index + 1}</td>
                                    <td className="border border-gray-400 p-2">
                                        <strong>{item.description}</strong><br />
                                        <span className="text-gray-600 text-xs">{item.desc}</span>
                                    </td>
                                    <td className="border border-gray-400 p-2">{item.quantity}</td>
                                    <td className="border border-gray-400 p-2">₹{Number(item.price).toFixed(2)}</td>
                                    <td className="border border-gray-400 p-2">₹{(item.quantity * item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                    </tbody>

                </table>

                {/* Total Section */}
                <div className="flex justify-end text-sm">
                    <table className="text-right w-1/2">
                        <tbody>
                            {/* Subtotal Calculation */}
                            <tr>
                                <td className="pr-4">Sub Total:</td>
                                <td>₹{subtotal.toFixed(2)}</td>
                            </tr>

                            {/* Discount Calculation (if applicable) */}
                            {discount > 0 && (
                                <tr>
                                    <td className="pr-4">Discount ({discount}%):</td>
                                    <td>-₹{discountAmount.toFixed(2)}</td>
                                </tr>
                            )}

                            {/* Tax Rate Display */}
                            <tr>
                                <td className="pr-4">Tax Rate:</td>
                                <td>{tax}%</td>
                            </tr>

                            {/* Final Total Calculation */}
                            <tr className="font-bold text-lg">
                                <td className="pr-4">Total:</td>
                                <td>₹{total.toFixed(2)}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>

            {/* Download Button */}
            <div className="flex justify-center">
                <button
                    onClick={generatePDF}
                    //loading clour
                    className="mt-4 cursor-pointer  bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? "Downloading" : "Download PDF"}
                </button>
            </div>
        </div>
    );
}
