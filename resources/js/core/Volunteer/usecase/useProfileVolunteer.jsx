import { useState, useContext } from "react";
import useGet from "../../../services/API/useGet";
import { AuthContext } from "../../../interfaces/components/AuthContext";
import usePost from "../../../services/API/usePost";

export const useProfileVolunteer = (id) => {
    const { get, loading, error } = useGet();
    const { post  } = usePost();
    const year = {
        year:new Date().getFullYear()
    };
    const [user, setUser] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const { login,auth } = useContext(AuthContext);

    console.log(auth);

    const fetchProfileVolunteer = async () => {
        try {
            // Use template literal for URL
            const profileData = await get(`/api/volunteer/${id}`);
           // console.log("vsdvhsohvodshvo");
        /*    if (profileData.user) {
                sessionStorage.setItem('token', profileData.user.token);
                login(profileData.user.token, profileData.user.user);
            }
*/          //console.log(profileData.user.name);
            login(sessionStorage.getItem('token'));
            const eventData = await post(`/api/volunteer/${id}/profile`,year);

            const mappedUser = {
                name: profileData.user.name,
                email: profileData.user.email,
                phone: profileData.user.phoneNumber,
                study: profileData.user.study,
                address: profileData.user.address,
                skills: JSON.parse(profileData.user.skills),
                qr_code_path: profileData.user.qr_code_path,
                stats: {
                    eventsApplied: eventData['user events'].eventStat.reduce(
                        (sum, stat) => sum + stat.total,
                        0
                    ),
                    acceptedEvents: eventData['user events'].eventStat.find(
                        (stat) => stat.status === 'Accepted'
                    )?.total || 0,
                    rejectedEvents: eventData['user events'].eventStat.find(
                        (stat) => stat.status === 'Rejected'
                    )?.total || 0,
                    pendingEvents: eventData['user events'].eventStat.find(
                        (stat) => stat.status === 'pending'
                    )?.total || 0,
                },
                eventData: eventData['user events'].report
                    .sort((a, b) => a.month - b.month)
                    .map((monthData) => monthData.total),
            };

            setUser(mappedUser);
            setFetchError(null);
        } catch (err) {
            console.error('Error fetching volunteer data:', err);
            setUser(null);
            setFetchError(err.message);
        }
    };
     console.log(user);
    return { fetchProfileVolunteer, user, loading, error: fetchError || error };
};
