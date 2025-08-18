import { useState } from "react";
import usePost from "../../../services/API/usePost";

export const useGetActivity = () => {
    const { post, loading, error } = usePost();
    const [activityData, setActivityData] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const fetchActivity = async (year = new Date().getFullYear()) => {
        try {
            const response = await post("/api/admin/charity/events-by-month", { year }); // adjust endpoint
            const report = response.report.original.monthly_events || {};

            console.log(report);

            // Map the report object to an array for Chart.js (Jan–Dec)
            const mappedData = Array.from({ length: 12 }, (_, i) => report[i + 1] || 0);

            setActivityData(mappedData);
            setFetchError(null);
        } catch (err) {
            console.error("Error fetching activity data:", err);
            setActivityData([]);
            setFetchError(err.message);
        }
    };

    return { fetchActivity, activityData, loading, error: fetchError || error };
};
