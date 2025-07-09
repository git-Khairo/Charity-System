import ReactDOM from 'react-dom/client';
import Home from "./pages/Home";
import Charities from "./pages/Charities";
import Campaigns from "./pages/Campaigns";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Layout from "./components/Layout";

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
                </Route>
            </Routes>
        </Router>
    )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App/>)
export default App;
