import { useState } from 'react';
import { Donation } from '../entity/Donation';
import usePost from '../../../services/API/usePost';
import { useParams } from 'react-router-dom';

const useDonation = () => {
  const [step, setStep] = useState(1);
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState('');
  const [bankStatement, setBankStatement] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    amount: '',
    payment: '',
  });

  const { post, response, error, loading } = usePost();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const handlePaymentSelect = (method) => {
    setFormData((prev) => ({ ...prev, payment: method }));
  };

  const handleBankStatementUpload = (e) => {
    const file = e.target.files[0];
    setBankStatement(file);
  };

  const handleSubmit = async (paymentIntent) => {
    if (paymentIntent === 'prev') {
      setStep((prev) => prev - 1);
      return;
    }

    try {
      if (formData.payment === 'bank' && !bankStatement) {
        alert('Please upload a bank statement.');
        return;
      }

      if (formData.payment === 'wallet' && !paymentIntent) {
        alert('Payment processing failed.');
        return;
      }

      // Simulate API call for final submission
      const submissionData = {
        ...formData,
        bankStatement: formData.payment === 'bank' ? bankStatement : null,
        paymentIntentId: paymentIntent ? paymentIntent.id : null,
      };
      console.log(submissionData);
      await post(`/api/donate/${id}/confirm`, submissionData);
      setStep(3);
    } catch (err) {
      alert('Submission failed: ' + err.message);
    }
  };

  const nextStep = async () => {
    try {
      const donation = new Donation(formData);
      const errors = donation.validate();

      if (errors) {
        alert(errors.join('\n'));
        return;
      }

      if (step === 1) {
        const result = await post(`/api/donate/${id}`, donation.toJSON());
        if (result?.donations) {
          setClientSecret(result.donations);
          setStep(2);
        } else {
          throw new Error('No client_secret received from backend.');
        }
      }
    } catch (err) {
      alert('Validation or API error: ' + err.message);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return {
    step,
    formData,
    clientSecret,
    bankStatement,
    handleChange,
    handlePaymentSelect,
    handleBankStatementUpload,
    handleSubmit,
    nextStep,
    prevStep,
    response,
    error,
    loading,
  };
};

export default useDonation;