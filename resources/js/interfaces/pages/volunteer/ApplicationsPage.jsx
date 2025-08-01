import React, {useEffect} from 'react';
import {useOutletContext, useParams} from 'react-router-dom';
import {useFetchUserEvents} from "../../../core/Volunteer/usecase/ useFetchUserEvent";

const ApplicationsPage = () => {
    const {user,authUser} = useOutletContext();
    const { id } = useParams();
    const { fetchUserEvent, userEvent, loading, error } = useFetchUserEvents();

    useEffect(() => {
        fetchUserEvent();
        console.log('vsvdsv');
    }, []);

    console.log(userEvent);

    if (authUser.id!==parseInt(id) || authUser.roles.some(role => role.name !== 'Volunteer')){
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Fuck off.....</p>
            </div>
        );
    }


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Loading profile...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
                <p>Error loading profile: {error}</p>
            </div>
        );
    }

    // If user is null (just in case)
    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>No user data available.</p>
            </div>
        );
    }

    if (!userEvent) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>No application data found.</p>
            </div>
        );
    }

    const applications = userEvent ;

    console.log(applications);

    return (
    <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight text-white">My Applications</h2>
      <div className="flex flex-col gap-6">
        {applications.map((app, index) => (
          <div key={index} className="bg-[#111111] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{app.title}</h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    app.status === 'Accepted' ? 'bg-green-500' : app.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                  } text-white`}
                >
                  {app.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-400">{app.location}</p>
              <p className="text-sm text-gray-400 line-clamp-2 mt-2">{app.whyVolunteer}</p>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <p className="font-medium">Preferred Time:</p>
                <p>{app.preferredTime}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <p className="font-medium">Availability:</p>
                <p>{app.availability}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {app.interests?.map((interest, i) => (
                  <span key={i} className="bg-gray-700 text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ApplicationsPage;
