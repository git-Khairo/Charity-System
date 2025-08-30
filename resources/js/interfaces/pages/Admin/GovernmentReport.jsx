import React, { useContext, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useOutletContext } from "react-router-dom";
import usePost from "../../../services/API/usePost";
import { AuthContext } from "../../components/AuthContext";

const Modal = ({ open, title, message, onClose, loading }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
                {loading ? (
                    <>
                        <h3 className="text-lg font-semibold mb-2">Processing...</h3>
                        <p>{message || "Please wait..."}</p>
                    </>
                ) : (
                    <>
                        <h3 className="text-lg font-semibold mb-2">{title}</h3>
                        <p className="mb-4">{message}</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const GovernmentReport = () => {
    const [startYear, setStartYear] = useState("2024");
    const [endYear, setEndYear] = useState("2025");
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState({ open: false, title: "", message: "", loading: false });
    const { auth } = useContext(AuthContext);
    const charity = auth?.user?.charity;

    const itemsPerPage = 10;
    const { post } = usePost();

    const totalPages = data ? Math.ceil(data.report.donorBreakdown.length / itemsPerPage) : 1;

    const currentItems = data
        ? data.report.donorBreakdown.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        : [];

    const showModal = (title, message, loading = false) => {
        setModal({ open: true, title, message, loading });
    };

    const fetchData = async () => {
        if (parseInt(startYear) > parseInt(endYear)) {
            showModal("Invalid Date Range", "Start year cannot be after end year!");
            return;
        }

        showModal("", "Fetching report...", true);

        try {
            const start = `${startYear}-01`;
            const end = `${endYear}-12`;

            const result = await post("/api/admin/charity/financialReport", {
                start,
                end,
                charity_id: charity.id,
            });

            setData(result);
            setPage(1);
            setModal({ ...modal, open: false });
        } catch (err) {
            showModal("Fetch Failed", JSON.stringify(err));
        }
    };

    const handleDownload = async () => {
        if (!data) return;

        showModal("", "Generating PDF, please wait...", true);

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 15;

        try {
            for (let p = 1; p <= totalPages; p++) {
                const pageItems = data.report.donorBreakdown.slice(
                    (p - 1) * itemsPerPage,
                    p * itemsPerPage
                );

                const tempDiv = document.createElement("div");
                tempDiv.style.padding = "20px";
                tempDiv.style.background = "#fff";
                tempDiv.style.fontFamily = "'Helvetica', 'Arial', sans-serif";
                tempDiv.style.width = "800px";

                tempDiv.innerHTML = `
                <div style="padding:15px; border:2px solid #2a7ae2; border-radius:8px; margin-bottom:20px;">
                    <h2 style="text-align:center; font-size:22px; font-weight:bold; margin-bottom:10px;">Government Donation Report</h2>
                    <p style="margin:3px 0;"><strong>Charity Name:</strong> ${charity.name}</p>
                    <p style="margin:3px 0;"><strong>Location:</strong> ${charity.location}</p>
                    <p style="margin:3px 0;"><strong>Email:</strong> ${charity.email}</p>
                    <p style="margin:3px 0;"><strong>Phone:</strong> ${charity.phoneNumber}</p>
                    <p style="margin-top:8px; font-size:16px; color:#2a7ae2; font-weight:bold;">
                        Total Amount Collected: $${data.report.totalAmount}
                    </p>
                </div>

                <table style="width:100%; border-collapse: collapse; font-size:14px;">
                    <thead>
                        <tr style="background:#f0f0f0; font-weight:bold;">
                            <th style="border:1px solid #ccc; padding:10px;">Name</th>
                            <th style="border:1px solid #ccc; padding:10px;">Email</th>
                            <th style="border:1px solid #ccc; padding:10px;">Total Donated</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageItems.map((donor, idx) => `
                            <tr style="background:${idx % 2 === 0 ? "#fafafa" : "#fff"}">
                                <td style="border:1px solid #ccc; padding:10px;">${donor.name}</td>
                                <td style="border:1px solid #ccc; padding:10px;">${donor.email}</td>
                                <td style="border:1px solid #ccc; padding:10px; color:#2a7ae2; font-weight:bold;">$${donor.total_donated}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

                document.body.appendChild(tempDiv);

                const canvas = await html2canvas(tempDiv, { scale: 2, useCORS: true });
                const imgData = canvas.toDataURL("image/png");
                const imgProps = pdf.getImageProperties(imgData);
                const imgHeight = (imgProps.height * (pdfWidth - 2 * margin)) / imgProps.width;

                // Watermark
                pdf.setFontSize(80);
                pdf.setTextColor(200, 200, 200);
                pdf.setGState(new pdf.GState({ opacity: 0.1 }));
                pdf.text("OFFICIAL", pdfWidth / 2, pdfHeight / 2, {
                    align: "center",
                    angle: 45,
                });
                pdf.setGState(new pdf.GState({ opacity: 1 }));

                // Add content
                pdf.addImage(imgData, "PNG", margin, 20, pdfWidth - 2 * margin, imgHeight);

                // Footer
                pdf.setFontSize(10);
                pdf.setTextColor(100);
                pdf.text(
                    `Page ${p} of ${totalPages} | Generated on ${new Date().toLocaleDateString()}`,
                    pdfWidth / 2,
                    pdfHeight - 10,
                    { align: "center" }
                );

                document.body.removeChild(tempDiv);

                if (p < totalPages) pdf.addPage();
            }

            pdf.save("official_report.pdf");
            showModal("Download Successful", "PDF generated successfully!");
        } catch (err) {
            console.error(err);
            showModal("Download Failed", "Error generating PDF.");
        } finally {
            setModal({ ...modal, open: false });
        }
    };


    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Generate Donation Report</h2>

            <div className="flex items-end mb-6 space-x-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Start Year</label>
                    <input
                        type="number"
                        min="2000"
                        max="2100"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        className="border rounded px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">End Year</label>
                    <input
                        type="number"
                        min="2000"
                        max="2100"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                        className="border rounded px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    onClick={fetchData}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                >
                    Fetch Report
                </button>
            </div>

            {data && (
                <>
                    <div className="border border-gray-300 p-6 rounded-lg bg-white shadow relative mb-4">
                        <div className="text-right text-gray-400 text-7xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] pointer-events-none select-none">
                            OFFICIAL
                        </div>

                        <p className="font-semibold text-gray-700 text-lg">
                            Charity Name: <span className="text-blue-600">{charity.name.en}</span>
                        </p>
                        <p className="font-medium text-gray-600">
                            Location: {charity.address.en} | Email: {charity.email} | Phone: {charity.phonenumber}
                        </p>
                        <p className="font-semibold text-gray-700 text-lg mt-2">
                            Total Amount Collected: <span className="text-blue-600">${data.report.totalAmount}</span>
                        </p>
                        <p className="text-gray-500 text-sm mb-4">Period: {startYear} to {endYear}</p>

                        <table className="w-full border-collapse border border-gray-300 text-left">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-3 py-2">Name</th>
                                <th className="border px-3 py-2">Email</th>
                                <th className="border px-3 py-2">Total Donated</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map((donor, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                                    <td className="border px-3 py-2">{donor.name}</td>
                                    <td className="border px-3 py-2">{donor.email}</td>
                                    <td className="border px-3 py-2 text-blue-600 font-bold">${donor.total_donated}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <div className="flex justify-between items-center mt-4">
                            <div>
                                Page {page} of {totalPages}
                            </div>
                            <div className="space-x-2">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage(page + 1)}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleDownload}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
                    >
                        Download PDF
                    </button>
                </>
            )}

            <Modal
                open={modal.open}
                title={modal.title}
                message={modal.message}
                loading={modal.loading}
                onClose={() => setModal({ ...modal, open: false })}
            />
        </div>
    );
};

export default GovernmentReport;
