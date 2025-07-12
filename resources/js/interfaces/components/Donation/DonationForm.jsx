import useDonation from "../../../core/Donation/usecase/useDonation";

const DonationForm = () => {
  const {
    step,
    formData,
    handleChange,
    handlePaymentSelect,
    nextStep,
    prevStep,
  } = useDonation();

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] text-[#000111] font-sans">

      {/* Sidebar with image and style */}
      <div className="w-[500px] h-screen overflow-hidden shadow-2xl rounded-r-3xl border-r border-gray-300">
        <img
          src=""
          alt="Charity Visual"
          className="w-full h-full object-cover rounded-r-3xl"
          style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
        />
      </div>

      {/* Main Form */}
      <div className="flex-1 p-8">
        {/* Steps */}
        <div className="flex justify-center space-x-8 mb-12">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                step >= n ? "bg-[#002366] text-white" : "bg-[#a7a7a7] text-white"
              }`}>
                {n}
              </div>
              <span className={`text-sm ${step >= n ? "text-[#002366]" : "text-[#a7a7a7]"}`}>
                {n === 1 ? "Personal Info" : n === 2 ? "Payment Method" : "Confirmation"}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold mb-6">Your Information</h2>
            <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-3 border border-[#a7a7a7] rounded-lg" />
            <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address" className="w-full px-4 py-3 border border-[#a7a7a7] rounded-lg" />
            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border border-[#a7a7a7] rounded-lg" />
            <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full px-4 py-3 border border-[#a7a7a7] rounded-lg" />
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Choose Payment Method</h2>
            <div className="space-y-4">
              <div onClick={() => handlePaymentSelect("bank")} className={`border rounded-lg p-4 cursor-pointer flex items-center ${
                formData.payment === "bank" ? "border-[#002366]" : "border-[#a7a7a7]"}`}>
                <input type="radio" name="payment" value="bank" checked={formData.payment === "bank"} readOnly />
                <span className="ml-2">Bank Transfer</span>
              </div>

              <div onClick={() => handlePaymentSelect("wallet")} className={`border rounded-lg p-4 cursor-pointer flex items-center ${
                formData.payment === "wallet" ? "border-[#002366]" : "border-[#a7a7a7]"}`}>
                <input type="radio" name="payment" value="wallet" checked={formData.payment === "wallet"} readOnly />
                <span className="ml-2">Digital Wallet</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-check-line text-3xl text-green-600"></i>
            </div>
            <h2 className="text-2xl font-bold mb-4">Thank You for Your Donation!</h2>
            <p className="text-[#a7a7a7] mb-6">A confirmation email will be sent to you.</p>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-left space-y-2 text-sm">
                <p><strong>Amount:</strong> $100 Monthly</p>
                <p><strong>Payment:</strong> {formData.payment === "bank" ? "Bank Transfer" : "Digital Wallet"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10 max-w-2xl mx-auto">
          {step > 1 ? (
            <button onClick={prevStep} className="text-[#002366] border border-[#002366] px-6 py-2 rounded-md hover:bg-[#002366] hover:text-white transition">
              ← Previous
            </button>
          ) : <div />}
          {step < 3 && (
            <button onClick={nextStep} className="bg-[#002366] text-white px-6 py-2 rounded-md hover:bg-[#001b4d] transition">
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
