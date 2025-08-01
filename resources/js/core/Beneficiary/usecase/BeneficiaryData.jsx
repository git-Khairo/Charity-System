// src/data/sampleData.js

export const colors = {
  primary: "#002366",
  secondary: "#a7a7a7",
  backgroundLight: "#f9f9f9",
  backgroundDark: "#121212",
  textLight: "#000111",
  textDark: "#e0e0e0",
  accent: "#97c9ea",
};

export const statusColor = {
  "Under Review": "text-yellow-500",
  Accepted: "text-green-600",
  Rejected: "text-red-600",
};

export const notificationsSample = [
  { id: 1, type: "Application Accepted", text: "Your application to Al-Rahma Association was accepted", date: "2025-07-11 10:15", read: false },
  { id: 2, type: "Alert", text: "There is an update on the association you applied to", date: "2025-07-10 14:00", read: true },
];

export const applicationsSample = [
  { id: 1, orgName: "Al-Rahma Association", date: "2025-06-20", status: "Under Review", details: "Monthly food assistance request" },
  { id: 2, orgName: "Al-Ber Association", date: "2025-05-15", status: "Accepted", details: "Urgent medical support request" },
  { id: 3, orgName: "Al-Khair Association", date: "2025-04-10", status: "Rejected", details: "Education support request" },
];

export const initialUserData = {
  name: "Tasnim Abd",
  idNumber: "919",
  address: "Damascus, Syria",
  phone: "+963999888777",
  avatar: "https://www.gravatar.com/avatar/?d=mp",
};
