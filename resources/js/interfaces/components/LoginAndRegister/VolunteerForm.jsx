import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { usePostVolunteer } from '../../../core/Volunteer/usecase/usePostVolunteer';
import { useNavigate } from 'react-router-dom';

const VolunteerForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { registerVolunteer, validateStep, response, loading } = usePostVolunteer();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    education: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    skills: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((s) => s !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const nextStep = () => {
    const stepErrors = validateStep(formData, step);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerVolunteer(formData);
      setStep(3); // Move to confirmation step only on successful submission
    } catch (err) {
      setErrors(err);
      if (err.name || err.phone || err.education || err.address) {
        setStep(1);
      } else if (err.email || err.password || err.confirmPassword || err.skills) {
        setStep(2);
      }
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
      className="max-w-2xl mx-auto bg-white shadow-xl border border-gray-200 rounded-2xl px-8 py-10 my-10"
    >
      <StepIndicator />

      {step === 1 && (
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Basic Information</h3>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="text"
                name="education"
                placeholder="Education"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.education ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.education}
                onChange={handleChange}
                required
              />
              {errors.education && <p className="mt-1 text-sm text-red-600">{errors.education}</p>}
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>
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
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Skills & Account</h3>

          <div className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-2">Select Your Skills:</label>
              <div className="flex flex-wrap gap-4">
                {['Teaching', 'Medical', 'Technical'].map((skill) => (
                  <label key={skill} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={skill}
                      checked={formData.skills.includes(skill)}
                      onChange={handleChange}
                      className="form-checkbox text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
              {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills}</p>}
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
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Review and Submit</h3>
          <p className="text-gray-600 mb-6">Please review your information before submitting.</p>
          <div className="text-left mb-6">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Education:</strong> {formData.education}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Skills:</strong> {formData.skills.join(', ')}</p>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              onClick={() => navigate('/')}
              className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Registration'}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default VolunteerForm;