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
    name: '',
    email: '',
    phonenumber: '',
    address: '',
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

        // Map frontend field names to backend expected names
        const submissionData = {
          name: formData.name,
          email: formData.email,
          phonenumber: formData.phonenumber,
          address: formData.address,
          amount: formData.amount,
          payment: formData.payment,
          paymentIntentId: paymentIntent ? paymentIntent.id : null,
        };

        if (formData.payment === 'bank' && bankStatement) {
          // Use FormData for bank transfers
          const formDataToSend = new FormData();
          Object.entries(submissionData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
          });
          formDataToSend.append('bankStatement', bankStatement, bankStatement.name || 'bank_statement.jpg');

          // Send FormData directly with fetch
          const token = sessionStorage.getItem('token');
          const res = await fetch(`/api/donate/${id}/confirm`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
            body: formDataToSend,
          });

          if (!res.ok) throw new Error(`Post request failed: ${res.statusText}`);

          const result = await res.json();
          if (result.error) throw new Error(result.error);
          setStep(3);
        } else {
          await post(`/api/donate/${id}/confirm`, submissionData);
          setStep(3);
        }
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
          console.log(result);
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