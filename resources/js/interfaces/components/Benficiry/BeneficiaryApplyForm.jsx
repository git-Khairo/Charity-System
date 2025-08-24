import useBeneficiaryForm from '../../../core/Beneficiary/usecase/useBeneficiaryForm';

const BeneficiaryApplyForm = () => {
  const {
    formData,
    maritalStatusOptions,
    workStatusOptions, // Updated to match hook
    aidTypeOptions,
    handleCheckboxChange,
    handleChange,
    handleSubmit,
    errors,
    loading,
  } = useBeneficiaryForm();

  return (
    <div className="relative py-5 inset-0 flex items-center justify-center bg-white">
      <div className="relative bg-background p-6 md:p-8 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] w-full max-w-3xl overflow-y-auto max-h-[90vh] transition-all duration-300">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Beneficiary Information
        </h2>

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.submit}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Marital Status */}
          <div>
            <label className="block text-text font-semibold mb-3">Marital Status:</label>
            <div className="flex flex-col gap-3">
              {maritalStatusOptions.map((status) => (
                <label key={status} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="maritalStatus"
                    value={status}
                    checked={formData.maritalStatus === status}
                    onChange={() => handleChange("maritalStatus", status)}
                  />
                  <span className="text-text">{status}</span>
                </label>
              ))}
            </div>
            {errors.maritalStatus && (
              <p className="text-red-500 text-sm mt-2">{errors.maritalStatus}</p>
            )}
          </div>

          {/* Work Status */}
          <div>
            <label className="block text-text font-semibold mb-3">Work Status:</label>
            <div className="flex flex-col gap-3">
              {workStatusOptions.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="workStatus"
                    value={item}
                    checked={formData.workStatus === item}
                    onChange={() => handleChange("workStatus", item)}
                  />
                  <span className="text-text">{item}</span>
                </label>
              ))}
            </div>
            {errors.workStatus && (
              <p className="text-red-500 text-sm mt-2">{errors.workStatus}</p>
            )}
          </div>

          {/* Type of Aid */}
          <div>
            <label className="block text-text font-semibold mb-3">Type of Aid Requested:</label>
            <div className="flex flex-col gap-3">
              {aidTypeOptions.map((aid) => (
                <label key={aid} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.needs.includes(aid)}
                    onChange={() => handleCheckboxChange("needs", aid)}
                  />
                  <span className="text-text">{aid}</span>
                </label>
              ))}
            </div>
            {errors.needs && (
              <p className="text-red-500 text-sm mt-2">{errors.needs}</p>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="mb-5">
          <label className="block text-text font-semibold mb-2">
            Current Financial Situation:
          </label>
          <textarea
            value={formData.details}
            onChange={(e) => handleChange("details", e.target.value)}
            className={`w-full border rounded-md p-3 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent shadow-sm ${
              errors.details ? 'border-red-500' : 'border-secondary'
            }`}
            rows="4"
            placeholder="Describe your current financial situation..."
          ></textarea>
          {errors.details && (
            <p className="text-red-500 text-sm mt-2">{errors.details}</p>
          )}
        </div>

        {/* Number of Members */}
        <div className="mb-6">
          <label className="block text-text font-semibold mb-2">
            Number of Household Members:
          </label>
          <input
            type="number"
            min="1"
            value={formData.numOfMembers}
            onChange={(e) => handleChange("numOfMembers", Number(e.target.value))}
            className={`w-full border rounded-md p-3 text-text focus:outline-none focus:ring-2 focus:ring-accent shadow-sm ${
              errors.numOfMembers ? 'border-red-500' : 'border-secondary'
            }`}
          />
          {errors.numOfMembers && (
            <p className="text-red-500 text-sm mt-2">{errors.numOfMembers}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 rounded-md font-semibold shadow-md transition duration-200 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-[#001a4d] hover:shadow-lg'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default BeneficiaryApplyForm;