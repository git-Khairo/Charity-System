import ReactDOM from 'react-dom/client';
import Home from "./pages/Home";
import Charities from "./pages/Charities";
import Campaigns from "./pages/Campaigns";
import Dashboard from "./pages/Admin/Dashboard";
import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from "react-router-dom";
import About from "./pages/About";
import Layout from "./components/Layout";
import Login from './pages/Login';
import UserTypeSelection from './pages/UserTypeSelection';
import VolunteerForm from './components/LoginAndRegister/VolunteerForm';
import BeneficiaryForm from './components/LoginAndRegister/BeneficiaryForm';
import DonationForm from './pages/DonationForm';
import { AuthProvider } from './components/AuthContext';
import VolunteerLayout from "./components/Volunteer/VolunteerLayout";
import ProfilePage from "./pages/volunteer/ProfilePage";
import ApplicationsPage from "./pages/volunteer/ApplicationsPage";
import FeedbackPage from "./pages/volunteer/FeedbackPage";
import NotificationsPage from "./pages/volunteer/NotificationsPage";
import CharityDetails from "./pages/charity/CharityDetails";
import BeneficiaryDashboard from "./components/Benficiry/BeneficiaryDashboard";
import CampaignDetails from "./pages/campain/CampaignDetails";
import Applications from "./pages/BeneficiaryDashboard/Applications";
import Notifications from "./pages/BeneficiaryDashboard/Notifications";
import Feedbacks from "./pages/BeneficiaryDashboard/Feedbacks";
import DashboardContent from "./pages/Admin/DashboardContent";
import MyCharities from "./pages/BeneficiaryDashboard/MyCharities";
import MyCampaigns from "./pages/volunteer/MyCampaigns";
import DeleteCampaigns from "./pages/Admin/DeleteCampaigns";
import UpdateCampaigns from "./pages/Admin/UpdateCampaigns";
import CreateCampaign from "./pages/Admin/CreateCampaign";
import ParticipationRequests from "./pages/Admin/ParticipationRequests";
import ActivityDashboard from "./pages/Admin/ActivityDashboard";
import GovernmentReport from "./pages/Admin/GovernmentReport";
import AdminLogin from './pages/Admin/AdminLogin';
import SuperDashboard from './pages/SuperAdmin/SuperDashboard';
import SuperDashboardContent from './pages/SuperAdmin/SuperDashboardContent';
import DonationRequests from './pages/Admin/DonationRequests';
import DonationDetails from './components/Donation/DonationDetails';
import BeneficiaryApplyForm from '../interfaces/components/Benficiry/BeneficiaryApplyForm';
import VolunteerFeedback from '../interfaces/pages/SuperAdmin/VolunteerFeedback';
import CreateCharity from '../interfaces/pages/SuperAdmin/CreateCharity';
import DeleteCharity from '../interfaces/pages/SuperAdmin/DeleteCharity';
import BeneficiaryFeedback from '../interfaces/pages/SuperAdmin/BeneficiaryFeedback';
import SuperActivityDashboard from '../interfaces/pages/SuperAdmin/SuperActivityDashboard';
import SuperGovernmentReport from '../interfaces/pages/SuperAdmin/SuperGovernmentReport';
import BeneficiaryRequest from "./pages/Admin/BeneficiaryRequest";

const AdminLoginPassword = ({ children }) => {
    const { password } = useParams();

    if(password == '12345'){
        return children
    }else{
        return <Navigate to={'/'} />
    }
}

const App = () => {
    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route element={<Layout />}>
                    <Route path="/" index element={<Home />} />
                    <Route path="/charities" element={<Charities />} />
                    <Route path="/campaigns" element={<Campaigns />} />
                    <Route path="/about us" element={<About/>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/userSelection' element={<UserTypeSelection />} />
                    <Route path='/volunteer/signup' element={<VolunteerForm />} />
                    <Route path='/beneficiary/signup' element={<BeneficiaryForm />} />
                    <Route path='/donate/:id' element={<DonationForm />} />
                    <Route path='/charity/:id' element={<CharityDetails />} />
                    <Route path="/campaign/:id" element={<CampaignDetails/>}/>
                    <Route path="/Beneficiary/:id" element={<BeneficiaryDashboard />}>
                        <Route path='profile' element={<Applications />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="feedbacks" element={<Feedbacks />} />
                        <Route path="myCharities" element={<MyCharities />} />
                    </Route>
                    <Route path="/beneficiary/apply/:id" element={<BeneficiaryApplyForm />} />
                    <Route path='/volunteer/:id'   element={<VolunteerLayout/>}>
                        <Route  path="profile"  element={<ProfilePage/>}/>
                        <Route  path="participations"  element={<ApplicationsPage/>}/>
                        <Route  path="feedback"  element={<FeedbackPage/>}/>
                        <Route  path="notifications"  element={<NotificationsPage/>}/>
                        <Route path="myEvents" element={<MyCampaigns />} />
                    </Route>
                    </Route>
                    <Route path='/admin/:password/login' element={
                        <AdminLoginPassword>
                            <AdminLogin/>
                        </AdminLoginPassword>
                    } />
                    <Route path='/superadmin/dashboard' element={<SuperDashboard />} >
                        <Route  path='' element={<SuperDashboardContent />} />
                        <Route  path="charity/delete"  element={<DeleteCharity />}/>
                        <Route  path="charity/Create"  element={<CreateCharity/>}/>
                        <Route  path="feedback/volunteers"  element={<VolunteerFeedback/>}/>
                        <Route  path="feedback/beneficiary" element={<BeneficiaryFeedback />} />
                        <Route  path="reports/activity"  element={<SuperActivityDashboard/>}/>
                        <Route  path="reports/financial"  element={<SuperGovernmentReport/>}/>
                    </Route>
                    <Route path='/dashboard/:id' element={<Dashboard />}>
                        <Route  path='' element={<DashboardContent />} />
                        <Route  path="events/delete"  element={<DeleteCampaigns/>}/>
                        <Route  path="events/Update"  element={<UpdateCampaigns/>}/>
                        <Route  path="events/Create"  element={<CreateCampaign/>}/>
                        <Route  path="requests/volunteers"  element={<ParticipationRequests/>}/>
                        <Route  path="requests/beneficiaries"  element={<BeneficiaryRequest/>}/>
                        <Route  path="requests/donations" element={<DonationRequests />} />
                        <Route  path='donation/details/:don' element={<DonationDetails />} />
                        <Route  path="reports/activity"  element={<ActivityDashboard/>}/>
                        <Route  path="reports/financial"  element={<GovernmentReport/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
            </Router>
    )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App/>)
export default App;
