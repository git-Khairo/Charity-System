import React, { useState, useEffect, useContext } from "react";
import { Outlet, NavLink, useParams, useLocation } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import { useBeneficiaryData } from "../../../core/Beneficiary/usecase/useBeneficiaryData";
import { useFetchUserDashboardData } from "../../../core/Beneficiary/usecase/useFetchUserDashboardData";
import { colors } from "../../../core/Beneficiary/usecase/BeneficiaryData";
import { AuthContext } from "../AuthContext";
import { EventIcon, NotificationIcon, FeedbackIcon } from "../Volunteer/SharedComponents";
import UserInfo from "../../pages/BeneficiaryDashboard/UserInfo";

export default function BeneficiaryDashboard() {
    const [darkMode, setDarkMode] = useState(false);
    const { auth } = useContext(AuthContext);
    const [authUser, setAuthUser] = useState(null);
    const { id } = useParams();
    const location = useLocation(); // detect route changes

    const {
        fetchDashboardData,
        notifications,
        applications,
        feedbacks,
        userData,
        loading,
        error,
    } = useFetchUserDashboardData();

    const {
        formEdit,
        isEditing,
        openEdit,
        closeEdit,
        saveEdit,
        handleFormChange,
    } = useBeneficiaryData();

    // Set auth user
    useEffect(() => {
        if (auth.isAuthenticated) {
            setAuthUser(auth.user);
        }
    }, [auth.isAuthenticated, id]);

    // Fetch dashboard data on authUser set or route change
    useEffect(() => {
        if (
            auth.isAuthenticated &&
            authUser &&
            authUser.id === parseInt(id) &&
            authUser.roles.some((role) => role.name === "Beneficiary")
        ) {
            fetchDashboardData();
        }
    }, [location.pathname, authUser]); // refresh on tab change

    // Dark mode styling
    useEffect(() => {
        document.body.style.backgroundColor = darkMode
            ? colors.backgroundDark
            : colors.backgroundLight;
        document.body.style.color = darkMode ? colors.textDark : colors.textLight;
    }, [darkMode]);

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-black text-white"><p>Loading profile...</p></div>;
    if (error) return <div className="flex items-center justify-center min-h-screen bg-black text-red-500"><p>Error loading profile: {error}</p></div>;
    if (!authUser || authUser.id !== parseInt(id) || authUser.roles.some((role) => role.name !== "Beneficiary"))
        return <div className="flex items-center justify-center min-h-screen bg-black text-white"><p>Access denied.</p></div>;
    if (!userData) return <div className="flex items-center justify-center min-h-screen bg-black text-white"><p>No user data available.</p></div>;

    return (
        <div
            style={{
                backgroundColor: darkMode ? colors.backgroundDark : colors.backgroundLight,
                color: darkMode ? colors.textDark : colors.textLight,
                minHeight: "100vh",
            }}
        >
            <main className="flex-grow container mx-auto p-6 space-y-10">
                <UserInfo userData={userData} darkMode={darkMode} openEdit={openEdit} />

                {/* Navigation */}
                <div className="flex justify-center space-x-6 my-4 text-lg font-medium">
                    <NavLink
                        to=""
                        end
                        onClick={() => fetchDashboardData()}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`
                        }
                    >
                        <EventIcon /> Applications
                    </NavLink>

                    <NavLink
                        to="feedbacks"
                        onClick={() => fetchDashboardData()}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`
                        }
                    >
                        <FeedbackIcon /> Feedback
                    </NavLink>

                    <NavLink
                        to="notifications"
                        onClick={() => fetchDashboardData()}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`
                        }
                    >
                        <NotificationIcon /> Notifications
                    </NavLink>

                    <NavLink
                        to="MyCharities"
                        onClick={() => fetchDashboardData()}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`
                        }
                    >
                        <NotificationIcon /> MyCharities
                    </NavLink>
                </div>

                {/* Nested Page Content */}
                <div className="mt-6">
                    <Outlet context={{ applications, notifications, feedbacks, authUser }} />
                </div>
            </main>

            {isEditing && (
                <EditProfileModal
                    darkMode={darkMode}
                    formEdit={formEdit}
                    handleFormChange={handleFormChange}
                    closeEdit={closeEdit}
                    saveEdit={saveEdit}
                />
            )}
        </div>
    );
}
