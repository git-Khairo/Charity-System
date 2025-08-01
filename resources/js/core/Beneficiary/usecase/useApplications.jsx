// ✅ Updated to accept the array directly
import { useState } from "react";

export function useApplications(applicationsData ) {
    // 🔁 Convert to array if it's an object
    const applications = Array.isArray(applicationsData)
        ? applicationsData
        : Object.values(applicationsData || {});

   // const [applications] = useState(safeData);

    console.log(Array.isArray(applicationsData));
    const [filterStatus, setFilterStatus] = useState("All");

    const filteredApplications =
        filterStatus === "All"
            ? applicationsData
            : applicationsData.filter((app) => app.status === filterStatus);

    return {
        applicationsData,
        filterStatus,
        setFilterStatus,
        filteredApplications,
    };
}
