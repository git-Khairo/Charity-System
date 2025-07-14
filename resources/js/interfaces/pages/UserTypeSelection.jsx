import { useNavigate } from "react-router-dom";

const UserTypeSelection = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br to-indigo-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl bg-white/30 shadow-2xl border border-gray-200 rounded-3xl p-12 md:p-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-14 text-center">
          Select Your Role
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Volunteer Card */}
          <div
            className="group bg-white/90 border border-gray-200 rounded-2xl p-10 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:border-blue-500 min-h-[300px] flex flex-col justify-start"
            onClick={() => navigate('/volunteer/signup')}
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl group-hover:bg-blue-500 group-hover:text-white transition">
                🤝
              </div>
              <h3 className="ml-4 text-2xl font-semibold text-gray-800">Volunteer</h3>
            </div>
            <p className="text-gray-600 text-base leading-relaxed text-left">
              Support others and contribute your skills and time to those in need.
              Make a positive impact in your community by offering help and compassion.
            </p>
          </div>

          {/* Beneficiary Card */}
          <div
            className="group bg-white/90 border border-gray-200 rounded-2xl p-10 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:border-indigo-500 min-h-[300px] flex flex-col justify-start"
            onClick={() => navigate('/beneficiary/signup')}
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-2xl group-hover:bg-indigo-500 group-hover:text-white transition">
                🙋‍♀️
              </div>
              <h3 className="ml-4 text-2xl font-semibold text-gray-800">Beneficiary</h3>
            </div>
            <p className="text-gray-600 text-base leading-relaxed text-left">
              Request assistance and connect with a supportive network of volunteers.
              Get help with dignity, empathy, and the care you deserve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
