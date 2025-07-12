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
import DonationForm from './components/Donation/DonationForm';

const App = () => {
    return(
        <Router>
            <Routes>
                <Route element={<Layout />}>
                <Route path="/" index element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/charities" element={<Charities />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/about us" element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/userSelection' element={<UserTypeSelection />} />
                <Route path='/volunteer/signup' element={<VolunteerForm />} />
                <Route path='/beneficiary/signup' element={<BeneficiaryForm />} />
                <Route path='/donate/:id' element={<DonationForm />} />
                </Route>
            </Routes>
        </Router>
    )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App/>)
export default App;
