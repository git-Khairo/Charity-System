// components/Sidebar.jsx
export default function Sidebar({ activeNav, setActiveNav }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-gauge-high' },
    { id: 'campaigns', label: 'Campaigns', icon: 'fa-solid fa-bullhorn' },
    { id: 'users', label: 'Users', icon: 'fa-solid fa-user-group' },
    { id: 'analytics', label: 'Analytics', icon: 'fa-solid fa-chart-line' },
    { id: 'settings', label: 'Settings', icon: 'fa-solid fa-gear' },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-[#002366] text-white flex flex-col">
      <div className="p-6 border-b border-[#001845]">
        <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
        <div className="flex items-center space-x-2 bg-[#001845] p-3 rounded-lg">
          <div className="w-10 h-10 bg-[#2196f3] rounded-full overflow-hidden">
            <img
              src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs text-gray-300">Administrator</div>
          </div>
        </div>
      </div>
      <nav className="py-6 flex-grow">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`w-full flex items-center px-6 py-3 text-left transition ${
                  activeNav === item.id ? 'bg-[#97c9ea] text-[#000111]' : 'text-gray-100 hover:bg-[#001845]'
                }`}
                onClick={() => setActiveNav(item.id)}
              >
                <i className={`${item.icon} w-6 text-center`} />
                <span className="ml-3 font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-[#001845] p-4">
        <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-[#001845]">
          <i className="fa-solid fa-user w-6 text-center" />
          <span className="ml-3">Profile</span>
        </a>
        <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-[#001845]">
          <i className="fa-solid fa-sign-out-alt w-6 text-center" />
          <span className="ml-3">Sign out</span>
        </a>
      </div>
    </aside>
  );
}
