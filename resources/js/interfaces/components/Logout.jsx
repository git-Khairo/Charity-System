import { useEffect } from "react";
import usePost from "../../services/API/usePost";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { post, loading, error } = usePost();
    const navigate = useNavigate();

    useEffect(() => {
        const handlelogout = async () => {
            try {
                await post('/api/logout');
            } catch (err) {
                console.error("Logout failed:", err);
            } finally {
                sessionStorage.removeItem('token');
                // Force reload so auth state resets everywhere
                window.location.href = '/';
            }
        };

        handlelogout();
    }, []);

    return;
}
 
export default Logout;