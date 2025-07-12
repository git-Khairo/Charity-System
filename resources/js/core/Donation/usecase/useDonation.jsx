// src/components/hooks/useDonationForm.js
import { useState } from "react";

export default function useDonation() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    payment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSelect = (payment) => {
    setFormData((prev) => ({ ...prev, payment }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return {
    step,
    formData,
    handleChange,
    handlePaymentSelect,
    nextStep,
    prevStep,
  };
}
