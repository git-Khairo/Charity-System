import useBeneficiaryForm from '../../../core/Beneficiary/usecase/useBeneficiaryForm';

const BeneficiaryForm = () => {
  const {
    formData,
    maritalStatusOptions,
    familyStatusOptions,
    aidTypeOptions,
    handleCheckboxChange,
    handleChange,
    handleSubmit,
  } = useBeneficiaryForm();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="relative bg-background p-6 md:p-8 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] w-full max-w-3xl overflow-y-auto max-h-[90vh] transition-all duration-300">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Beneficiary Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Marital Status */}
          <div>
            <label className="block text-text font-semibold mb-3">Marital Status:</label>
            <div className="flex flex-col gap-3">
              {maritalStatusOptions.map((status) => (
                <label key={status} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.maritalStatus.includes(status)}
                    onChange={() => handleCheckboxChange("maritalStatus", status)}
                  />
                  <span className="text-text">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Family Status */}
          <div>
            <label className="block text-text font-semibold mb-3">Family Status:</label>
            <div className="flex flex-col gap-3">
              {familyStatusOptions.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.familyStatus.includes(item)}
                    onChange={() => handleCheckboxChange("familyStatus", item)}
                  />
                  <span className="text-text">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type of Aid */}
          <div>
            <label className="block text-text font-semibold mb-3">Type of Aid Requested:</label>
            <div className="flex flex-col gap-3">
              {aidTypeOptions.map((aid) => (
                <label key={aid} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.aidType.includes(aid)}
                    onChange={() => handleCheckboxChange("aidType", aid)}
                  />
                  <span className="text-text">{aid}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Financial Situation */}
        <div className="mb-5">
          <label className="block text-text font-semibold mb-2">
            Current Financial Situation:
          </label>
          <textarea
            value={formData.financialSituation}
            onChange={(e) => handleChange("financialSituation", e.target.value)}
            className="w-full border border-secondary rounded-md p-3 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
            rows="4"
            placeholder="Describe your current financial situation..."
          ></textarea>
        </div>

        {/* Household Members */}
        <div className="mb-6">
          <label className="block text-text font-semibold mb-2">
            Number of Household Members:
          </label>
          <input
            type="number"
            min="1"
            value={formData.householdMembers}
            onChange={(e) => handleChange("householdMembers", Number(e.target.value))}
            className="w-full border border-secondary rounded-md p-3 text-text focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-2 rounded-md font-semibold shadow-md transition duration-200 hover:bg-[#001a4d] hover:shadow-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default BeneficiaryForm;