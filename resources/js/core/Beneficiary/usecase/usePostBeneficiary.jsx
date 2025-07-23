import { Beneficiary } from "../entity/Beneficiary";
import usePost from "../../../services/API/usePost";
import { useContext } from "react";
import { AuthContext } from "../../../interfaces/components/AuthContext";

export const usePostBeneficiary = () => {
  const { post, response, error, loading } = usePost();
  const { login } = useContext(AuthContext);

  const validateStep = (formData, stepNumber) => {
    // Create Beneficiary entity
    const beneficiary = new Beneficiary({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.password,
      phoneNumber: formData.phone,
      address: formData.address,
      details: formData.otherDetails,
      familyMembers: parseInt(formData.familyMembers, 10) || 0,
      needs: formData.needs,
    });

    // Get validation errors from Beneficiary entity
    const validationErrors = beneficiary.validate();
    const stepErrors = {};

    if (stepNumber === 1) {
      // Validate Step 1 fields: name, phone, familyMembers, address, otherDetails
      if (validationErrors.name) stepErrors.name = validationErrors.name;
      if (validationErrors.phonenumber) stepErrors.phone = validationErrors.phonenumber;
      if (validationErrors.familyMember) stepErrors.familyMembers = validationErrors.familyMember;
      if (validationErrors.address) stepErrors.address = validationErrors.address;
      if (validationErrors.details) stepErrors.otherDetails = validationErrors.details;
    } else if (stepNumber === 2) {
      // Validate Step 2 fields: email, password, needs
      if (validationErrors.email) stepErrors.email = validationErrors.email;
      if (validationErrors.password) stepErrors.password = validationErrors.password;
      if (validationErrors.needs) stepErrors.needs = validationErrors.needs;
    }

    return stepErrors;
  };

  const registerBeneficiary = async (formData) => {
    // Validate all fields before submission
    const step1Errors = validateStep(formData, 1);
    const step2Errors = validateStep(formData, 2);
    const allErrors = { ...step1Errors, ...step2Errors };
    
    if (Object.keys(allErrors).length !== 0) {
      throw allErrors;
    }
    
    // Create Beneficiary entity
    const beneficiary = new Beneficiary({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.password,
      phoneNumber: formData.phone,
      address: formData.address,
      details: formData.otherDetails,
      familyMembers: parseInt(formData.familyMembers, 10),
      needs: formData.needs,
    });

    // Post the data to the API
    try {
      const result = await post('/api/beneficiary/register', beneficiary.toJSON());
      if(result.beneficiaries){
        sessionStorage.setItem('token', result.beneficiaries.token);
        login(result.beneficiaries.token, result.beneficiaries.user)
      }
      return result;
    } catch (err) {
      throw new Error(`Failed to register beneficiary: ${err.message}`);
    }
  };

  return { registerBeneficiary, validateStep, response, error, loading };
};