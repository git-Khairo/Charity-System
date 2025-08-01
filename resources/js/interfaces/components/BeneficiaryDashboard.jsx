
import React, {useState, useEffect, useContext} from "react";
import UserInfo from "../pages/Dashboard/BeneficiaryDashboard/UserInfo";
import Applications from "../pages/Dashboard/BeneficiaryDashboard/Applications";
import Notifications from "../pages/Dashboard/BeneficiaryDashboard/Notifications";
import EditProfileModal from "../pages/Dashboard/BeneficiaryDashboard/EditProfileModal";
import {useBeneficiaryData} from "../../core/Beneficiary/usecase/useBeneficiaryData";
import {useApplications} from "../../core/Beneficiary/usecase/useApplications";
import {useNotifications} from "../../core/Beneficiary/usecase/useNotifications";
import {colors} from "../../core/Beneficiary/usecase/BeneficiaryData";
import {useFetchUserDashboardData} from "../../core/Beneficiary/usecase/useFetchUserDashboardData";
import {AuthContext} from "./AuthContext";
import {useParams} from "react-router-dom";
import {EditIcon, EventIcon, FeedbackIcon, NotificationIcon, ProfileIcon} from "./Volunteer/SharedComponents";


export default function BeneficiaryDashboard() {
const [darkMode, setDarkMode] = useState(false);
const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { login,auth } = useContext(AuthContext);
    const [authUser, setAuthUser] = useState(null);
    const { id } = useParams();

    const {
        fetchDashboardData,
        notifications,
        applications,
        userData,
        loading,
        error,
    } = useFetchUserDashboardData();

    useEffect(() => {
        if (auth.isAuthenticated && authUser && authUser.id===parseInt(id) && authUser.roles.some(role => role.name === 'Beneficiary')) {
            fetchDashboardData();
        }
    }, [id,authUser]);

    useEffect(() => {

        if (auth.isAuthenticated) {
            setAuthUser( auth.user.valid.user);
        }

    }, [auth.isAuthenticated,id,authUser]);

  //  console.log(authUser.id!==parseInt(id) || authUser.roles.some(role => role.name !== 'Beneficiary'));

const {
formEdit,
// setFormEdit,
isEditing,
openEdit,
closeEdit,
saveEdit,
handleFormChange,
} = useBeneficiaryData();

const {
filterStatus,
setFilterStatus,
filteredApplications,
} = useApplications(applications || []);



/*const {
showNotifications,
setShowNotifications,
unreadCount,
} = useNotifications();
*/
useEffect(() => {
document.body.style.backgroundColor = darkMode ? colors.backgroundDark : colors.backgroundLight;
document.body.style.color = darkMode ? colors.textDark : colors.textLight;
}, [darkMode]);


    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Loading profile...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
                <p>Error loading profile: {error}</p>
            </div>
        );
    }

    // If user is null (just in case)
    if (!authUser || authUser.id!==parseInt(id) || authUser.roles.some(role => role.name !== 'Beneficiary')){
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Fuck off.....</p>
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
    <UserInfo
      userData={userData}
      darkMode={darkMode}
      openEdit={openEdit}
    />

    <Applications
    filteredApplications={filteredApplications}
      applications={filteredApplications}
      darkMode={darkMode}
      filterStatus={filterStatus}
      setFilterStatus={setFilterStatus}
    />

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
