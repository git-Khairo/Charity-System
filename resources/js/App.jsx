import React from "react";
import ReactDOM from 'react-dom/client';
import Layout from './Layout';

const App = () => {
    return(
        <Layout/>
    )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App/>)
export default App;
