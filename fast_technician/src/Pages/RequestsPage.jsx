// src/pages/RequestsPage.jsx
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FaCheck,
    FaTimes,
    FaClock,
    FaEnvelope,
    FaPhone,
    FaUser,
    FaCalendarAlt,
    FaClipboardList,
    FaInbox,
    FaChevronRight,
} from "react-icons/fa";
import { fetchAllRequests } from "../redux/slices/request/technicianRequestSlice";
import TopBar from "../components/TopBar";
import MobileNavFooter from "../components/NavigationFooter";

export default function RequestsPage() {
    const dispatch = useDispatch();
    const [showIssueIndex, setShowIssueIndex] = useState(null);
    const { requests, loading, error } = useSelector(
        (state) => state.technicianRequests
    );
    console.log('requests', requests)

    useEffect(() => {
        dispatch(fetchAllRequests());
    }, [dispatch]);

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    const formatTime = (dateString) =>
        new Date(dateString).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        });

    const handleAccept = (id) => {
        console.log("Accepted request:", id);
    };

    const handleReject = (id) => {
        console.log("Rejected request:", id);
    };

    const sortedRequests = [...requests].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <>
            <TopBar />
            <div className="min-h-screen bg-gray-50 py-6 px-4">

                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <FaClipboardList className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Service Requests
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Review and manage incoming requests
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Request Summary */}
                    {!loading && !error && requests.length > 0 && (
                        <div className="flex gap-3 p-4">
                            {/* Pending */}
                            <div className="flex-1 bg-white rounded-lg p-3 shadow border border-gray-200 flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {requests.filter((r) => r.status === "Pending").length}
                                    </p>
                                    <p className="text-xs text-gray-500">Pending</p>
                                </div>
                                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                    <FaClock className="w-4 h-4 text-amber-600" />
                                </div>
                            </div>

                            {/* Accepted */}
                            <div className="flex-1 bg-white rounded-lg p-3 shadow border border-gray-200 flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-semibold text-emerald-600">
                                        {requests.filter((r) => r.status === "Accepted").length}
                                    </p>
                                    <p className="text-xs text-gray-500">Accepted</p>
                                </div>
                                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <FaCheck className="w-4 h-4 text-emerald-600" />
                                </div>
                            </div>

                            {/* Rejected */}
                            <div className="flex-1 bg-white rounded-lg p-3 shadow border border-gray-200 flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-semibold text-rose-600">
                                        {requests.filter((r) => r.status === "Rejected").length}
                                    </p>
                                    <p className="text-xs text-gray-500">Rejected</p>
                                </div>
                                <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                                    <FaTimes className="w-4 h-4 text-rose-600" />
                                </div>
                            </div>
                        </div>

                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600 font-medium">Loading requests...</p>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FaTimes className="w-5 h-5 text-red-600" />
                                </div>
                                <p className="text-red-700 font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && !error && requests.length === 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaInbox className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                No requests yet
                            </h3>
                            <p className="text-gray-500 text-sm">
                                New service requests will appear here
                            </p>
                        </div>
                    )}

                    {/* Request List */}
                    {!loading && !error && requests.length > 0 && (
                        <div className="space-y-3 mb-18">
                            {sortedRequests.map((req, index) => (
                                <div
                                    key={req._id || index}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="relative bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-100">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {req.serviceType || "Unknown Service"}
                                                        </h3>

                                                        {/* Chip/Button */}
                                                        <button
                                                            onClick={() =>
                                                                setShowIssueIndex(
                                                                    showIssueIndex === index ? null : index
                                                                )
                                                            }
                                                            className="text-xs bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-300 transition"
                                                        >
                                                            View Issue
                                                        </button>

                                                        <FaChevronRight className="w-3 h-3 text-gray-400" />
                                                    </div>

                                                    {/* Absolute Popup only for selected card */}
                                                    {showIssueIndex === index && (
                                                        <div className="absolute left-0 mt-2 w-full bg-gray-50 border border-gray-200 rounded-md p-3 shadow-md z-10 text-sm text-gray-700">
                                                            {req?.issue || "No issue details available"}
                                                        </div>
                                                    )}
                                                </div>
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${req.status === "Pending"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : req.status === "Accepted"
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : "bg-rose-100 text-rose-700"
                                                        }`}
                                                >
                                                    {req.status === "Pending" ? (
                                                        <FaClock className="w-3 h-3" />
                                                    ) : req.status === "Accepted" ? (
                                                        <FaCheck className="w-3 h-3" />
                                                    ) : (
                                                        <FaTimes className="w-3 h-3" />
                                                    )}
                                                    {req.status || "Pending"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-5 pb-5 border-b border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <FaUser className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Name</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {req.name || "N/A"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <FaPhone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Phone</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {req.phone || "N/A"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <FaEnvelope className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Email</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {req.email || "N/A"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Date & Time</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {formatDate(req.createdAt)} • {formatTime(req.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleAccept(req._id)}
                                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
                                            >
                                                <FaCheck className="w-4 h-4" />
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleReject(req._id)}
                                                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border-2 border-gray-200"
                                            >
                                                <FaTimes className="w-4 h-4" />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <MobileNavFooter/>
                </div>
            </div>
        </>
    );
}
