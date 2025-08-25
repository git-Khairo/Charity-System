export class Beneficiary {
  constructor({ name, email, password, confirmPassword, phoneNumber, address }, options = {}) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.phoneNumber = phoneNumber;
    this.address = address;

      this.skipPasswordValidation = options.skipPasswordValidation || false;
  }

  // Validate the Beneficiary entity based on backend rules
  validate() {
    const errors = {};

    // Name validation: required, string, max 255 characters
    if (!this.name || typeof this.name !== 'string' || this.name.length > 255) {
      errors.name = 'Name is required and must be a string with a maximum length of 255 characters.';
    }

    // Email validation: required, valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailRegex.test(this.email)) {
      errors.email = 'A valid email is required.';
    }

    // Password validation: required, minimum 8 characters
      if (!this.skipPasswordValidation) {
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

          if (!this.password || !passwordRegex.test(this.password)) {
              errors.password = 'Password must be at least 8 characters long and contain both letters and numbers.';
          }

          if (this.password !== this.confirmPassword) {
              errors.password = 'Passwords do not match.';
          }
      }

    // Phone number validation: required, string
    if (!this.phoneNumber || typeof this.phoneNumber !== 'string') {
      errors.phonenumber = 'Phone number is required and must be a string.';
    }

    // Address validation: required, string, max 255 characters
    if (!this.address || typeof this.address !== 'string' || this.address.length > 255) {
      errors.address = 'Address is required and must be a string with a maximum length of 255 characters.';
    }


    return errors;
  }

  // Prepare data for API submission
  toJSON() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.confirmPassword,
      phonenumber: this.phoneNumber,
      address: this.address,
    };
  }
}
