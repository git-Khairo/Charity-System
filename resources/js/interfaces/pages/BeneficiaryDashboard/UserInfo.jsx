

import React from "react";

export default function UserInfo({ userData, openEdit, darkMode }) {
return (
<section
className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10"
style={{ backgroundColor: darkMode ? "#1e293b" : "white" }}
>
<img src={userData.avatar} alt="User Avatar" className="rounded-full w-32 h-32 border-4 border-blue-400" />
<div className="flex-grow">
<h2 className="text-3xl font-bold mb-4">Beneficiary Details</h2>
<p>
<strong>Name:</strong> {userData.name}
</p>
<p>
<strong>Email:</strong> {userData.email}
</p>
<p>
<strong>Address:</strong> {userData.address}
</p>
<p>
<strong>Phone:</strong> {userData.phonenumber}
</p>
</div>
<button onClick={openEdit} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition" >
Edit Profile
</button>
</section>
);
}

