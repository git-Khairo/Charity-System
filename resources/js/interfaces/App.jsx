import React from "react";
import ReactDOM from 'react-dom/client';
import Layout from './Layout';
import Home from "./pages/Home";
import Charities from "./pages/Charities";
import Campaigns from "./pages/Campaigns";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
    return(
        <Router>
            <Routes>
                <Route element={<Layout />}>
                <Route path="/" index element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/charities" element={<Charities />} />
                <Route path="/campaigns" element={<Campaigns />} />
                </Route>
            </Routes>
        </Router>
    )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App/>)
export default App;
