// components/CampaignTable.jsx
export default function CampaignTable({ campaigns }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {campaigns.map((c, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-[#97c9ea] bg-opacity-20 rounded-lg flex items-center justify-center text-[#002366]">
                    <i className="fa-solid fa-bullhorn" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{c.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#002366] h-2.5 rounded-full" style={{ width: `${c.progress}%` }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{c.progress}% Complete</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{c.startDate}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{c.endDate}</td>
              <td className="px-6 py-4">
                <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">{c.status}</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <div className="flex space-x-3">
                  <button className="text-[#002366] hover:text-[#001845]"><i className="fa-solid fa-pen-to-square" /></button>
                  <button className="text-[#002366] hover:text-[#001845]"><i className="fa-solid fa-chart-line" /></button>
                  <button className="text-red-600 hover:text-red-800"><i className="fa-solid fa-trash" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
