import { useState } from "react";
import usePost from '../../../services/API/usePost';
import { useNavigate, useParams } from "react-router-dom";

const useBeneficiaryForm = () => {
  const [formData, setFormData] = useState({
    maritalStatus: "", // Single string for radio input
    workStatus: "", // Single string for radio input
    needs: [], // Array for checkbox input
    details: "",
    numOfMembers: 0,
  });
  const [errors, setErrors] = useState({});
  const { post, loading, error: postError } = usePost();
  const { id } = useParams();
  const navigate = useNavigate();

  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
  const workStatusOptions = ["Retired", "Employeed", "Unemployeed", "Student"]; // Renamed for clarity
  const aidTypeOptions = ["Housing Support", "Food Assistance", "Medical Aid", "Education Grants"];

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    // Marital Status: Must not be empty
    if (!formData.maritalStatus) {
      newErrors.maritalStatus = "Please select a marital status";
    }

    // Work Status: Must not be empty
    if (!formData.workStatus) {
      newErrors.workStatus = "Please select a work status";
    }

    // Needs: At least one option must be selected
    if (formData.needs.length === 0) {
      newErrors.needs = "Please select at least one type of need";
    }

    // Details: Must not be empty and should have a minimum length of 3
    if (!formData.details.trim()) {
      newErrors.details = "Details are required";
    } else if (formData.details.length < 3) {
      newErrors.details = "Please provide more details (minimum 3 characters)";
    }

    // Number of Members: Must be a positive number
    if (isNaN(formData.numOfMembers) || formData.numOfMembers <= 0) {
      newErrors.numOfMembers = "Number of household members must be a positive number";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Data is already in the correct format for the backend (strings for maritalStatus, workStatus, needs)
    try {
      const result = await post(`/api/beneficiary/charity/${id}`, {
        ...formData,
        needs: formData.needs.join(","), // Convert needs array to comma-separated string
      });
      console.log("Submission successful:", result);
      setFormData({
        maritalStatus: "",
        workStatus: "",
        needs: [],
        details: "",
        numOfMembers: 0,
      });
      setErrors({});

      navigate('/charities');
    } catch (err) {
      setErrors({ submit: `Submission failed: ${err.message}` });
    }
  };

  return {
    formData,
    maritalStatusOptions,
    workStatusOptions, // Updated name
    aidTypeOptions,
    handleCheckboxChange,
    handleChange,
    handleSubmit,
    errors,
    loading,
    postError,
  };
};

export default useBeneficiaryForm;