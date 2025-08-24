import { useState } from "react";

const useBeneficiaryForm = () => {
  const [formData, setFormData] = useState({
    maritalStatus: [],
    familyStatus: [],
    aidType: [],
    financialSituation: "",
    householdMembers: 1,
  });

  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
  const familyStatusOptions = ["Has Siblings", "Employed", "Unemployed", "Student"];
  const aidTypeOptions = ["Housing Support", "Food Assistance", "Medical Aid", "Education Grants"];

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
  };

  return {
    formData,
    maritalStatusOptions,
    familyStatusOptions,
    aidTypeOptions,
    handleCheckboxChange,
    handleChange,
    handleSubmit,
  };
};

export default useBeneficiaryForm;