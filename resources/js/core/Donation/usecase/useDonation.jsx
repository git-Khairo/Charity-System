import { useState } from 'react';
import { Donation } from '../entity/Donation';
import usePost from '../../../services/API/usePost';
import { useParams } from 'react-router-dom';

const useDonation = () => {
  const [step, setStep] = useState(1);
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState('');
  const [bankStatement, setBankStatement] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    address: '',
    amount: '',
    payment: '',
  });

  const { post, response, error, loading } = usePost();

  const validateStep = (stepNumber) => {
    const stepErrors = {};

    if (stepNumber === 1) {
      // Validate Step 1 fields: name, email, phonenumber, address, amount
      const donation = new Donation({
        name: formData.name,
        email: formData.email,
        phonenumber: formData.phonenumber,
        address: formData.address,
        amount: Number(formData.amount) || 0,
      });
      const validationErrors = donation.validate();
      Object.assign(stepErrors, validationErrors);
    } else if (stepNumber === 2) {
      // Validate Step 2: payment method
      if (!formData.payment) {
        stepErrors.payment = 'Please select a payment method.';
      }
    }

    return stepErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePaymentSelect = (method) => {
    setFormData((prev) => ({ ...prev, payment: method }));
    setErrors((prev) => ({ ...prev, payment: '' }));
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

    // Validate all fields before final submission
    const step1Errors = validateStep(1);
    const step2Errors = validateStep(2);
    const allErrors = { ...step1Errors, ...step2Errors };
    setErrors(allErrors);

    if (Object.keys(allErrors).length !== 0) {
      if (Object.keys(step1Errors).length > 0) setStep(1);
      else if (Object.keys(step2Errors).length > 0) setStep(2);
      return;
    }

    try {
      if (formData.payment === 'bank' && !bankStatement) {
        setErrors({ bankStatement: 'Please upload a bank statement.' });
        return;
      }

      if (formData.payment === 'wallet' && !paymentIntent) {
        setErrors({ payment: 'Payment processing failed.' });
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
      setErrors({ submit: `Submission failed: ${err.message}` });
    }
  };

  const nextStep = async () => {
    const stepErrors = validateStep(step);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length === 0) {
      if (step === 1) {
        try {
          const result = await post(`/api/donate/${id}`, new Donation(formData).toJSON());
          if (result?.donations) {
            setClientSecret(result.donations);
            setStep(2);
          } else {
            setErrors({ submit: 'No client_secret received from backend.' });
          }
        } catch (err) {
          setErrors({ submit: `API error: ${err.message}` });
        }
      } else {
        setStep(3); // Move to review step
      }
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    setErrors({});
  };

  return {
    step,
    formData,
    clientSecret,
    bankStatement,
    errors,
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