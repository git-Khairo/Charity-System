// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import * as echarts from 'echarts';
const Dashboard = () => {
const [activeNav, setActiveNav] = useState('dashboard');
const [timeFilter, setTimeFilter] = useState('monthly');

// Mock data for metrics
const metrics = [
{
title: 'Total Users',
value: '12,845',
change: '+12.5%',
isPositive: true,
icon: 'fa-solid fa-users',
color: '#002366',
bgColor: 'rgba(0, 35, 102, 0.1)'
},
{
title: 'Total Campaigns',
value: '867',
change: '+8.2%',
isPositive: true,
icon: 'fa-solid fa-bullhorn',
color: '#002366',
bgColor: 'rgba(0, 35, 102, 0.1)'
},
{
title: 'Attendees Rate',
value: '78.3%',
change: '-2.1%',
isPositive: false,
icon: 'fa-solid fa-chart-pie',
color: '#002366',
bgColor: 'rgba(0, 35, 102, 0.1)'
},
{
title: 'Donations',
value: '$487,362',
change: '+18.7%',
isPositive: true,
icon: 'fa-solid fa-hand-holding-heart',
color: '#002366',
bgColor: 'rgba(0, 35, 102, 0.1)'
}
];
// Navigation items
const navItems = [
{ id: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-gauge-high' },
{ id: 'campaigns', label: 'Campaigns', icon: 'fa-solid fa-bullhorn' },
{ id: 'users', label: 'Users', icon: 'fa-solid fa-user-group' },
{ id: 'analytics', label: 'Analytics', icon: 'fa-solid fa-chart-line' },
{ id: 'settings', label: 'Settings', icon: 'fa-solid fa-gear' }
];
// Initialize chart
React.useEffect(() => {
const chartDom = document.getElementById('main-chart');
if (!chartDom) return;
const myChart = echarts.init(chartDom);
// Data for different time periods
const chartData = {
weekly: {
dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
users: [120, 132, 101, 134, 90, 230, 210]
},
monthly: {
dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
users: [820, 932, 901, 934, 1290, 1330, 1320, 1450, 1200, 1100, 1380, 1520]
},
yearly: {
dates: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
users: [3200, 4320, 5800, 7200, 8900, 10500, 12845]
}
};
const data = chartData[timeFilter];
const option = {
animation: false,
tooltip: {
trigger: 'axis',
axisPointer: {
type: 'shadow'
}
},
legend: {
data: ['Users'],
bottom: 0
},
grid: {
left: '3%',
right: '4%',
bottom: '10%',
top: '10%',
containLabel: true
},
xAxis: {
type: 'category',
data: data.dates,
axisTick: {
alignWithLabel: true
}
},
yAxis: [
{
type: 'value',
name: 'Users',
position: 'left',
axisLine: {
show: true,
lineStyle: {
color: '#002366'
}
},
axisLabel: {
formatter: '{value}'
}
}
],
series: [
{
name: 'Users',
type: 'bar',
data: data.users,
itemStyle: {
color: '#002366'
}
}
]
};
myChart.setOption(option);
const handleResize = () => {
myChart.resize();
};
window.addEventListener('resize', handleResize);
return () => {
window.removeEventListener('resize', handleResize);
myChart.dispose();
};
}, [timeFilter]);
return (
<div className="flex flex-col min-h-screen bg-[#f9f9f9]">
{/* Sidebar */}
<aside className="fixed left-0 top-0 bottom-0 w-60 bg-[#002366] text-white overflow-y-auto z-10 transition-all duration-300 ease-in-out flex flex-col">
<div className="p-6 border-b border-[#001845]">
<h1 className="text-xl font-bold text-white mb-6">Admin Dashboard</h1>
<div className="flex items-center space-x-2 bg-[#001845] p-3 rounded-lg">
<div className="w-10 h-10 rounded-full bg-[#2196f3] overflow-hidden">
<img
src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20business%20person%20with%20neutral%20expression%20against%20a%20plain%20light%20background%2C%20high%20quality%2C%20realistic%2C%20professional%20looking&width=100&height=100&seq=1&orientation=squarish"
alt="User avatar"
className="w-full h-full object-cover object-top"
/>
</div>
<div className="flex-1 text-left">
<div className="font-medium text-sm">John Doe</div>
<div className="text-xs text-gray-300">Administrator</div>
</div>
</div>
</div>
<nav className="py-6 flex-grow">
<ul className="space-y-2">
{navItems.map(item => (
<li key={item.id}>
<button
className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-300 ease-in-out cursor-pointer !rounded-button whitespace-nowrap ${
activeNav === item.id
? 'bg-[#97c9ea] text-[#000111]'
: 'text-gray-100 hover:bg-[#001845]'
}`}
onClick={() => setActiveNav(item.id)}
>
<i className={`${item.icon} w-6 text-center`}></i>
<span className="ml-3 font-medium">{item.label}</span>
</button>
</li>
))}
</ul>
</nav>
<div className="mt-auto border-t border-[#001845] p-4">
<a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-[#001845] transition-colors duration-200">
<i className="fa-solid fa-user w-6 text-center"></i>
<span className="ml-3">Profile</span>
</a>
<a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-[#001845] transition-colors duration-200">
<i className="fa-solid fa-sign-out-alt w-6 text-center"></i>
<span className="ml-3">Sign out</span>
</a>
</div>
</aside>
{/* Main Content */}
<main className="ml-60 pt-8 pb-8 px-6 flex-grow">
<div className="max-w-7xl mx-auto">
{/* Dashboard Title */}
<div className="flex justify-between items-center mb-8 mt-6">
<h2 className="text-2xl font-semibold text-[#333333]">Dashboard Overview</h2>
<div className="text-sm text-gray-500">
<span className="mr-2">Today:</span>
<span className="font-medium">May 21, 2025</span>
</div>
</div>
{/* Metrics Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
{metrics.map((metric, index) => (
<div
key={index}
className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md cursor-pointer !rounded-button whitespace-nowrap"
style={{ borderLeft: `4px solid ${metric.color}` }}
>
<div className="flex justify-between items-start">
<div>
<h3 className="text-gray-500 font-medium mb-1">{metric.title}</h3>
<p className="text-2xl font-bold">{metric.value}</p>
<div className={`mt-2 text-sm font-medium ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
<span>{metric.change}</span>
<span className="ml-1">since last month</span>
</div>
</div>
<div
className="w-12 h-12 rounded-full flex items-center justify-center"
style={{ backgroundColor: metric.bgColor }}
>
<i className={`${metric.icon} text-xl`} style={{ color: metric.color }}></i>
</div>
</div>
</div>
))}
</div>
{/* Chart Section */}
<div className="bg-white rounded-lg shadow-sm p-6 mb-8">
<div className="flex justify-between items-center mb-6">
<h3 className="text-xl font-semibold text-[#333333]">Analytics Overview</h3>
<div className="flex space-x-2">
{['weekly', 'monthly', 'yearly'].map(period => (
<button
key={period}
className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap ${
timeFilter === period
? 'bg-[#002366] text-white'
: 'bg-gray-100 text-[#000111] hover:bg-gray-200'
}`}
onClick={() => setTimeFilter(period)}
>
{period.charAt(0).toUpperCase() + period.slice(1)}
</button>
))}
</div>
</div>
<div id="main-chart" className="w-full h-[400px]"></div>
</div>
{/* Active Campaigns Section */}
<div className="bg-white rounded-lg shadow-sm p-6">
<div className="flex justify-between items-center mb-6">
<h3 className="text-xl font-semibold text-[#333333]">Active Campaigns</h3>
<div className="flex space-x-3">
<button className="px-4 py-2 bg-[#002366] text-white rounded-md hover:bg-[#001845] transition-colors duration-200 flex items-center space-x-2 !rounded-button whitespace-nowrap">
<i className="fa-solid fa-plus text-sm"></i>
<span>New Campaign</span>
</button>
<button className="text-[#002366] hover:text-[#001845] font-medium cursor-pointer !rounded-button whitespace-nowrap">
View All
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="min-w-full divide-y divide-gray-200">
<thead className="bg-gray-50">
<tr>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Campaign
</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Progress
</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Start Date
</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
End Date
</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Status
</th>
<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Actions
</th>
</tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
{[
{ name: 'Summer Sale 2025', progress: 75, startDate: 'May 15, 2025', endDate: 'Jun 15, 2025', status: 'Active' },
{ name: 'Product Launch', progress: 45, startDate: 'May 20, 2025', endDate: 'Jun 20, 2025', status: 'Active' },
{ name: 'Email Newsletter', progress: 90, startDate: 'May 10, 2025', endDate: 'May 25, 2025', status: 'Active' },
{ name: 'Social Media', progress: 30, startDate: 'May 18, 2025', endDate: 'Jun 30, 2025', status: 'Active' },
{ name: 'Holiday Special', progress: 15, startDate: 'May 21, 2025', endDate: 'Jul 05, 2025', status: 'Active' },
].map((campaign, index) => (
<tr key={index} className="hover:bg-gray-50">
<td className="px-6 py-4">
<div className="flex items-center">
<div className="h-10 w-10 rounded-lg bg-[#97c9ea] bg-opacity-20 flex items-center justify-center text-[#002366]">
<i className="fa-solid fa-bullhorn"></i>
</div>
<div className="ml-3">
<div className="text-sm font-medium text-gray-900">{campaign.name}</div>
</div>
</div>
</td>
<td className="px-6 py-4">
<div className="w-full bg-gray-200 rounded-full h-2.5">
<div className="bg-[#002366] h-2.5 rounded-full" style={{ width: `${campaign.progress}%` }}></div>
</div>
<div className="text-xs text-gray-500 mt-1">{campaign.progress}% Complete</div>
</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
{campaign.startDate}
</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
{campaign.endDate}
</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
{campaign.status}
</span>
</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
<div className="flex space-x-3">
<button className="text-[#002366] hover:text-[#001845]">
<i className="fa-solid fa-pen-to-square"></i>
</button>
<button className="text-[#002366] hover:text-[#001845]">
<i className="fa-solid fa-chart-line"></i>
</button>
<button className="text-red-600 hover:text-red-800">
<i className="fa-solid fa-trash"></i>
</button>
</div>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</div>
</main>
</div>
);
};
export default Dashboard;