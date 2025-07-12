import { Beneficiary } from "../entity/Beneficiary";
import usePost from "../../../services/API/usePost";

export const usePostBeneficairy = () => {
  const { post, response, error, loading } = usePost();

  const registerBeneficiary = async (formData) => {
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

    // Validate the entity
    const validationErrors = beneficiary.validate();
    if (validationErrors) {
      throw new Error(validationErrors.join(' '));
    }

    console.log(beneficiary.toJSON());

    // Post the data to the API
    try {
      const result = await post('/api/beneficiary/register', beneficiary.toJSON());
      return result;
    } catch (err) {
      throw new Error(`Failed to register beneficiary: ${err.message}`);
    }
  };

  return { registerBeneficiary, response, error, loading };
};