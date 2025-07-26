import React from 'react';

const EditProfileModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#111518] rounded-2xl p-8 w-full max-w-xl shadow-xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-400"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-white text-[28px] font-bold leading-tight text-center pb-6 pt-2">
          Edit Profile
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            onSave(data);
          }}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="block text-white font-medium mb-2">Name</label>
            <input
              name="name"
              type="text"
              className="w-full rounded-xl bg-[#283139] text-white placeholder:text-[#9cabba] p-4 h-14 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your Name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white font-medium mb-2">Email</label>
            <input
              name="email"
              type="email"
              className="w-full rounded-xl bg-[#283139] text-white placeholder:text-[#9cabba] p-4 h-14 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-white font-medium mb-2">Phone Number</label>
            <input
              name="phone"
              type="text"
              className="w-full rounded-xl bg-[#283139] text-white placeholder:text-[#9cabba] p-4 h-14 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="+1 234 567 890"
            />
          </div>

          {/* Study */}
          <div>
            <label className="block text-white font-medium mb-2">Study</label>
            <input
              name="study"
              type="text"
              className="w-full rounded-xl bg-[#283139] text-white placeholder:text-[#9cabba] p-4 h-14 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your Major"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-white font-medium mb-2">Address</label>
            <textarea
              name="address"
              rows="3"
              className="w-full rounded-xl bg-[#283139] text-white placeholder:text-[#9cabba] p-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Your Address"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              className="bg-[#0b80ee] text-white font-bold py-3 rounded-full w-full hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#283139] text-white font-bold py-3 rounded-full w-full hover:bg-[#3a4752] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
