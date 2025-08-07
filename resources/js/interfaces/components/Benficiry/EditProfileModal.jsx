import React from "react";

export default function EditProfileModal({
  formEdit,
  handleFormChange,
  saveEdit,
  closeEdit,
  darkMode,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md shadow-lg"
        style={{
          color: darkMode ? "#f9f9f9" : "#1f2937",
        }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

        <form onSubmit={saveEdit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={formEdit.name}
              onChange={handleFormChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formEdit.phone}
              onChange={handleFormChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Address</label>
            <input
              type="text"
              name="address"
              value={formEdit.address}
              onChange={handleFormChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeEdit}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
