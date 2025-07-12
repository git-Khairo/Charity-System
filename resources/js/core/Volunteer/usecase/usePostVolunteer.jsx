import { Volunteer } from "../entity/Volunteer";
import usePost from "../../../services/API/usePost";

export const usePostVolunteer = () => {
  const { post, response, error, loading } = usePost();

  const registerVolunteer = async (formData) => {
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

    // Validate the entity
    const validationErrors = volunteer.validate();
    if (validationErrors) {
      throw new Error(validationErrors.join(' '));
    }

    // Post the data to the API
    try {
      const result = await post('/api/volunteer/register', volunteer.toJSON());
      return result;
    } catch (err) {
      throw new Error(`Failed to register volunteer: ${err.message}`);
    }
  };

  return { registerVolunteer, response, error, loading };
};