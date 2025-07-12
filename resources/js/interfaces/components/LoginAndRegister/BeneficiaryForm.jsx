import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { usePostBeneficairy } from '../../../core/Beneficiary/usecase/usePostBeneficiary';

const BeneficiaryForm = ({ onFinish }) => {
  const [step, setStep] = useState(1);
  const { registerBeneficiary, response, error, loading } = usePostBeneficairy();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    familyMembers: '',
    address: '',
    email: '',
    password: '',
    needs: [],
    otherDetails: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        needs: checked
          ? [...prev.needs, value]
          : prev.needs.filter((n) => n !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerBeneficiary(formData);
      onFinish();
    } catch (err) {
      alert(err.message); // Display error to user
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-10">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
            step === s
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-400 border-gray-300'
          }`}
        >
          {s}
        </div>
      ))}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white/30 shadow-xl border border-gray-200 rounded-2xl px-8 py-10 my-10"
    >
      <StepIndicator />

      {step === 1 && (
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Basic Information</h3>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="familyMembers"
              placeholder="Number of Family Members"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.familyMembers}
              onChange={handleChange}
              required
              min="1"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <textarea
              name="otherDetails"
              placeholder="Additional information about your situation"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={formData.otherDetails}
              onChange={handleChange}
            />
          </div>

          <div className="mt-8 text-right">
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Your Needs & Account</h3>

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block font-medium text-gray-700 mb-2">Select Your Needs:</label>
              <div className="flex flex-wrap gap-4">
                {['Food', 'Medical', 'Shelter'].map((need) => (
                  <label key={need} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={need}
                      checked={formData.needs.includes(need)}
                      onChange={handleChange}
                      className="form-checkbox text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">{need}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-12">
          <FaCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Complete</h3>
          <p className="text-gray-600 mb-6">
            Thank you for signing up. A confirmation email has been sent to your inbox.
          </p>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      )}
    </form>
  );
};

export default BeneficiaryForm;
