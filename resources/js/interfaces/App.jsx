import ReactDOM from 'react-dom/client';
import Home from "./pages/Home";
import Charities from "./pages/Charities";
import Campaigns from "./pages/Campaigns";
import Dashboard from "./pages/Dashboard";
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

const App = () => {
    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route element={<Layout />}>
                    <Route path="/" index element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/charities" element={<Charities />} />
                    <Route path="/campaigns" element={<Campaigns />} />
                    <Route path="/about us" element={<About/>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/userSelection' element={<UserTypeSelection />} />
                    <Route path='/volunteer/signup' element={<VolunteerForm />} />
                    <Route path='/beneficiary/signup' element={<BeneficiaryForm />} />
                    <Route path='/donate/:id' element={<DonationForm />} />
                    <Route path='/volunteer/:id'   element={<VolunteerLayout/>}>
                        <Route  path="profile"  element={<ProfilePage/>}/>
                        <Route  path="participations"  element={<ApplicationsPage/>}/>
                        <Route  path="feedback"  element={<FeedbackPage/>}/>
                        <Route  path="notifications"  element={<NotificationsPage/>}/>
                    </Route>
                    </Route>
                </Routes>
            </AuthProvider>
            </Router>
    )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App/>)
export default App;
