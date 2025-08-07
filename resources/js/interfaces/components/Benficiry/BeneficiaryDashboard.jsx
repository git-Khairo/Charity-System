import React, { useState, useEffect, useContext } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import { useBeneficiaryData } from "../../../core/Beneficiary/usecase/useBeneficiaryData";
import { useApplications } from "../../../core/Beneficiary/usecase/useApplications";
import { useFetchUserDashboardData } from "../../../core/Beneficiary/usecase/useFetchUserDashboardData";
import { colors } from "../../../core/Beneficiary/usecase/BeneficiaryData";
import { AuthContext } from "../AuthContext";
import { ProfileIcon, EventIcon, NotificationIcon, FeedbackIcon, EditIcon } from "../Volunteer/SharedComponents";
import UserInfo from "../../pages/BeneficiaryDashboard/UserInfo";

export default function BeneficiaryDashboard() {
    const [darkMode, setDarkMode] = useState(false);
    const { login, auth } = useContext(AuthContext);
    const [authUser, setAuthUser] = useState(null);
    const { id } = useParams();

    const {
        fetchDashboardData,
        notifications,
        applications,
        feedbacks,
        userData,
        loading,
        error,
    } = useFetchUserDashboardData();

    console.log(userData);

    useEffect(() => {
        if (
            auth.isAuthenticated &&
            authUser &&
            authUser.id === parseInt(id) &&
            authUser.roles.some((role) => role.name === "Beneficiary")
        ) {
            fetchDashboardData();
        }
    }, [id, authUser]);

    useEffect(() => {
        if (auth.isAuthenticated) {
            setAuthUser(auth.user.valid.user);
        }
    }, [auth.isAuthenticated, id]);

    const {
        formEdit,
        isEditing,
        openEdit,
        closeEdit,
        saveEdit,
        handleFormChange,
    } = useBeneficiaryData();



    useEffect(() => {
        document.body.style.backgroundColor = darkMode
            ? colors.backgroundDark
            : colors.backgroundLight;
        document.body.style.color = darkMode ? colors.textDark : colors.textLight;
    }, [darkMode]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
                <p>Error loading profile: {error}</p>
            </div>
        );
    }

    if (
        !authUser ||
        authUser.id !== parseInt(id) ||
        authUser.roles.some((role) => role.name !== "Beneficiary")
    ) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Access denied.</p>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>No user data available.</p>
            </div>
        );
    }

    return (
        <div
            style={{
                backgroundColor: darkMode ? colors.backgroundDark : colors.backgroundLight,
                color: darkMode ? colors.textDark : colors.textLight,
                minHeight: "100vh",
            }}
        >
            <main className="flex-grow container mx-auto p-6 space-y-10">
                {/* User Info Header */}
                <UserInfo
                    userData={userData}
                    darkMode={darkMode}
                    openEdit={openEdit}
                />

                {/* Navigation */}
                <div className="flex justify-center space-x-6 my-4 text-lg font-medium">
                    <NavLink
                        to=""
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"
                            }`
                        }
                    >
                        <EventIcon /> Applications
                    </NavLink>

                    <NavLink
                        to="feedback"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"
                            }`
                        }
                    >
                        <FeedbackIcon /> Feedback
                    </NavLink>

                    <NavLink
                        to="notifications"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"
                            }`
                        }
                    >
                        <NotificationIcon /> Notifications
                    </NavLink>
                </div>

                {/* Nested Page Content */}
                <div className="mt-6">
                    <Outlet context={{applications,notifications,feedbacks}}/>
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
