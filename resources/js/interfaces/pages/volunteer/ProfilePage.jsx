import React, { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { Info, StatCard } from '../../components/Volunteer/SharedComponents';


const ProfilePage = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const {user} = useOutletContext();

 // console.log(user);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chartInstance.current) chartInstance.current.destroy();
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Events Applied',
          data: user.eventData,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        }],
      },
      options: {
        scales: {
          y: { beginAtZero: true, ticks: { color: '#9CA3AF' }, grid: { color: 'rgba(255,255,255,0.1)' } },
          x: { ticks: { color: '#9CA3AF' }, grid: { display: false } },
        },
        plugins: { legend: { display: false } },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [user.eventData]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 bg-light-background">
        <div className="lg:col-span-2 bg-light-background p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">User Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-light-text">
            <Info label="Name" value={user.name} />
            <Info label="Email" value={user.email} />
            <Info label="Phone Number" value={user.phone} />
            <Info label="Study" value={user.study} />
            <div className="md:col-span-2">
              <Info label="Address" value={user.address} />
            </div>
          </div>
        </div>

        <div className="bg-light-background p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            { user.skills.map((skill) => (
              <span key={skill} className="bg-light-background2 text-black text-xs font-semibold px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-light-background">
        <StatCard title="Events Applied" count={user.stats.eventsApplied} />
        <StatCard title="Accepted Events" count={user.stats.acceptedEvents} />
        <StatCard title="Rejected Events" count={user.stats.rejectedEvents} />
      </div>

      <div className="bg-light-background p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Monthly Event Applications</h3>
        <canvas ref={chartRef} className="w-full" />
      </div>
    </>
  );
};

export default ProfilePage;
