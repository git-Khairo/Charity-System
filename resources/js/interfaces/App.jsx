import ReactDOM from 'react-dom/client';
import Home from "./pages/Home";
import Charities from "./pages/Charities";
import Campaigns from "./pages/Campaigns";
import Dashboard from "./pages/Admin/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
                    <Route path="/beneficiary/:id" element={<BeneficiaryDashboard />}>
                        <Route path='profile' element={<Applications />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="feedbacks" element={<Feedbacks />} />
                        <Route path="myCharities" element={<MyCharities />} />
                    </Route>
                    <Route path='/volunteer/:id'   element={<VolunteerLayout/>}>
                        <Route  path="profile"  element={<ProfilePage/>}/>
                        <Route  path="participations"  element={<ApplicationsPage/>}/>
                        <Route  path="feedback"  element={<FeedbackPage/>}/>
                        <Route  path="notifications"  element={<NotificationsPage/>}/>
                        <Route path="myEvents" element={<MyCampaigns />} />
                    </Route>
                    <Route path="/campaign/:id" element={<CampaignDetails/>}/>
                    </Route>
                    <Route path='/dashboard/:id' element={<Dashboard />}>
                        <Route path='' element={<DashboardContent />} />
                        <Route  path="events/delete"  element={<DeleteCampaigns/>}/>
                        <Route  path="events/Update"  element={<UpdateCampaigns/>}/>
                        <Route  path="events/Create"  element={<CreateCampaign/>}/>
                        <Route  path="requests/volunteers"  element={<ParticipationRequests/>}/>
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
