import { useState } from 'react';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import useDonation from '../../core/Donation/usecase/useDonation';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(window.STRIPE_PUBLIC_KEY);

// Step 1: Personal Information
const PersonalInfoStep = ({ formData, handleChange, nextStep, errors }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-6">Your Information</h2>
      <div>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366] ${
            errors.name ? 'border-red-500' : 'border-[#a7a7a7]'
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>
      <div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email Address"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366] ${
            errors.email ? 'border-red-500' : 'border-[#a7a7a7]'
          }`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>
      <div>
        <input
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
          type="tel"
          placeholder="Phone Number"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366] ${
            errors.phonenumber ? 'border-red-500' : 'border-[#a7a7a7]'
          }`}
        />
        {errors.phonenumber && <p className="mt-1 text-sm text-red-500">{errors.phonenumber}</p>}
      </div>
      <div>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366] ${
            errors.address ? 'border-red-500' : 'border-[#a7a7a7]'
          }`}
        />
        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
      </div>
      <div>
        <input
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          type="number"
          placeholder="Amount"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366] ${
            errors.amount ? 'border-red-500' : 'border-[#a7a7a7]'
          }`}
        />
        {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
      </div>
      {errors.submit && <p className="text-red-500 mt-4">{errors.submit}</p>}
      <div className="flex justify-end mt-6">
        <button
          onClick={nextStep}
          className="bg-[#002366] text-white px-6 py-2 rounded-md hover:bg-[#001b4d] transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

// Step 2: Payment Method
const PaymentMethodStep = ({ formData, handlePaymentSelect, handleBankStatementUpload, handleSubmit, clientSecret, errors }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [stripeError, setStripeError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = handleSubmit('validate');
    if (Object.keys(stepErrors).length !== 0) return;

    if (formData.payment === 'wallet' && stripe && elements) {
      setProcessing(true);
      setStripeError('');

      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (stripeError) {
        setStripeError(stripeError.message);
        setProcessing(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        handleSubmit(paymentIntent);
      } else {
        setStripeError('Payment failed. Please try again.');
        setProcessing(false);
      }
    } else if (formData.payment === 'bank') {
      // handleSubmit(null); // Proceed to review for bank transfer
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Choose Payment Method</h2>
      <div className="space-y-4">
        <div
          onClick={() => handlePaymentSelect('bank')}
          className={`border rounded-lg p-4 cursor-pointer flex items-center ${
            formData.payment === 'bank' ? 'border-[#002366]' : 'border-[#a7a7a7]'
          } ${errors.payment ? 'border-red-500' : ''}`}
        >
          <input
            type="radio"
            name="payment"
            value="bank"
            checked={formData.payment === 'bank'}
            readOnly
          />
          <span className="ml-2">Bank Transfer</span>
        </div>
        <div
          onClick={() => handlePaymentSelect('wallet')}
          className={`border rounded-lg p-4 cursor-pointer flex items-center ${
            formData.payment === 'wallet' ? 'border-[#002366]' : 'border-[#a7a7a7]'
          } ${errors.payment ? 'border-red-500' : ''}`}
        >
          <input
            type="radio"
            name="payment"
            value="wallet"
            checked={formData.payment === 'wallet'}
            readOnly
          />
          <span className="ml-2">Online Payment (Stripe)</span>
        </div>
      </div>
      {errors.payment && <p className="mt-1 text-sm text-red-500">{errors.payment}</p>}
      <div className="mt-6">
        {formData.payment === 'wallet' && (
          <div className="border p-4 rounded-md shadow-sm bg-white">
            <label className="block mb-2 text-sm font-medium">Card Details</label>
            <CardElement className="border p-3 rounded-md" />
          </div>
        )}
        {formData.payment === 'bank' && (
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium">Upload Bank Statement</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBankStatementUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#002366] file:text-white hover:file:bg-[#001b4d]"
            />
            {errors.bankStatement && <p className="mt-1 text-sm text-red-500">{errors.bankStatement}</p>}
          </div>
        )}
      </div>
      {stripeError && <p className="text-red-500 mt-4">{stripeError}</p>}
      {errors.submit && <p className="text-red-500 mt-4">{errors.submit}</p>}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handleSubmit('prev')}
          className="text-[#002366] border border-[#002366] px-6 py-2 rounded-md hover:bg-[#002366] hover:text-white transition"
        >
          ← Previous
        </button>
        <button
          onClick={onSubmit}
          disabled={processing}
          className={`bg-[#002366] text-white px-6 py-2 rounded-md hover:bg-[#001b4d] transition ${
            processing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {processing ? 'Processing...' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

// Step 3: Review and Confirmation
const ConfirmationStep = ({ formData, prevStep, errors, loading }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Review Your Donation</h2>
      <p className="text-[#a7a7a7] mb-6">Please review your information before submitting.</p>
      <div className="bg-white rounded-lg p-6 shadow-sm border text-left space-y-2 text-sm">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phonenumber}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>Amount:</strong> ${formData.amount}</p>
        <p><strong>Payment:</strong> {formData.payment === 'bank' ? 'Bank Transfer' : 'Digital Wallet'}</p>
      </div>
      {errors.submit && <p className="text-red-500 mt-4">{errors.submit}</p>}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="text-[#002366] border border-[#002366] px-6 py-2 rounded-md hover:bg-[#002366] hover:text-white transition"
        >
          ← Previous
        </button>
        <button
          onClick={() => navigate('/')}
          disabled={loading}
          className={`bg-[#002366] text-white px-6 py-2 rounded-md hover:bg-[#001b4d] transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Donation'}
        </button>
      </div>
    </div>
  );
};

// Main DonationForm Component
const DonationForm = () => {
  const {
    step,
    formData,
    clientSecret,
    errors,
    handleChange,
    handlePaymentSelect,
    handleBankStatementUpload,
    handleSubmit,
    nextStep,
    prevStep,
    loading,
  } = useDonation();

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] text-[#000111] font-sans">
      <div className="w-[500px] h-screen overflow-hidden shadow-2xl rounded-r-3xl border-r border-gray-300">
        <img
          src="https://www.welcome.com"
          alt="Charity Visual"
          className="w-full h-full object-cover rounded-r-3xl"
          style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
        />
      </div>
      <div className="flex-1 p-8">
        <div className="flex justify-center space-x-8 mb-12">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                  step >= n ? 'bg-[#002366] text-white' : 'bg-[#a7a7a7] text-white'
                }`}
              >
                {n}
              </div>
              <span
                className={`text-sm ${step >= n ? 'text-[#002366]' : 'text-[#a7a7a7]'}`}
              >
                {n === 1 ? 'Personal Info' : n === 2 ? 'Payment Method' : 'Review'}
              </span>
            </div>
          ))}
        </div>
        {step === 1 && (
          <PersonalInfoStep
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            errors={errors}
          />
        )}
        {step === 2 && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentMethodStep
              formData={formData}
              handlePaymentSelect={handlePaymentSelect}
              handleBankStatementUpload={handleBankStatementUpload}
              handleSubmit={handleSubmit}
              clientSecret={clientSecret}
              errors={errors}
            />
          </Elements>
        )}
        {step === 3 && (
          <ConfirmationStep
            formData={formData}
            prevStep={prevStep}
            errors={errors}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default DonationForm;