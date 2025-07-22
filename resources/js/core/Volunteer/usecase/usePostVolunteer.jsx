import { Volunteer } from "../entity/Volunteer";
import usePost from "../../../services/API/usePost";

export const usePostVolunteer = () => {
  const { post, response, error, loading } = usePost();

  const validateStep = (formData, stepNumber) => {
    // Create Volunteer entity
    const volunteer = new Volunteer({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phoneNumber: formData.phone,
      address: formData.address,
      study: formData.education,
      skills: formData.skills,
    });

    // Get validation errors from Volunteer entity
    const validationErrors = volunteer.validate() || [];
    const stepErrors = {};

    if (stepNumber === 1) {
      // Validate Step 1 fields: name, phone, education, address
      if (validationErrors.name) {
        stepErrors.name = validationErrors.name;
      }
      if (validationErrors.phonenumber) {
        stepErrors.phone = validationErrors.phonenumber;
      }
      if (validationErrors.study) {
        stepErrors.education = validationErrors.study;
      }
      if (validationErrors.address) {
        stepErrors.address = validationErrors.address;
      }
    } else if (stepNumber === 2) {
      // Validate Step 2 fields: email, password, confirmPassword, skills
      if (validationErrors.email) {
        stepErrors.email = validationErrors.email;
      }
      if (validationErrors.password) {
        stepErrors.password = validationErrors.password;
      }
      if (validationErrors.password) {
        stepErrors.confirmPassword = validationErrors.password;
      }
      if (validationErrors.skills) {
        stepErrors.skills = validationErrors.skills;
      }
    }

    return stepErrors;
  };

  const registerVolunteer = async (formData) => {
    // Validate all fields before submission
    const step1Errors = validateStep(formData, 1);
    const step2Errors = validateStep(formData, 2);
    const allErrors = { ...step1Errors, ...step2Errors };

    if (Object.keys(allErrors).length !== 0) {
      throw allErrors;
    }

    // Create Volunteer entity
    const volunteer = new Volunteer({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phoneNumber: formData.phone,
      address: formData.address,
      study: formData.education,
      skills: formData.skills,
    });

    // Post the data to the API
    try {
      const result = await post('/api/volunteer/register', volunteer.toJSON());
      if(result.user){
        sessionStorage.setItem('token', result.user.token);
      }
      return result;
    } catch (err) {
      throw new Error(`Failed to register volunteer: ${err.message}`);
    }
  };

  return { registerVolunteer, validateStep, response, error, loading };
};