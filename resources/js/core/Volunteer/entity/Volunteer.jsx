export class Volunteer {
  constructor({ name, email, password, confirmPassword, phoneNumber, address, study, skills }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.study = study;
    this.skills = skills;
  }

  // Validate the Volunteer entity based on backend rules
  validate() {
    const errors = [];

    // Name validation: required, string, max 255 characters
    if (!this.name || typeof this.name !== 'string' || this.name.length > 255) {
      errors.push('Name is required and must be a string with a maximum length of 255 characters.');
    }

    // Email validation: required, valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailRegex.test(this.email)) {
      errors.push('A valid email is required.');
    }

    // Password validation: required, minimum 8 characters, must contain letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!this.password || !passwordRegex.test(this.password)) {
      errors.push('Password must be at least 8 characters long and contain both letters and numbers.');
    }

    // Confirm password validation
    if (this.password !== this.confirmPassword) {
      errors.push('Passwords do not match.');
    }

    // Phone number validation: required
    if (!this.phoneNumber || typeof this.phoneNumber !== 'string') {
      errors.push('Phone number is required and must be a string.');
    }

    // Address validation: required, string
    if (!this.address || typeof this.address !== 'string') {
      errors.push('Address is required and must be a string.');
    }

    // Study validation: required, string
    if (!this.study || typeof this.study !== 'string') {
      errors.push('Education is required and must be a string.');
    }

    // Skills validation: required, array of strings
    if (!Array.isArray(this.skills) || this.skills.length === 0) {
      errors.push('Skills must be a non-empty array.');
    } else if (!this.skills.every((skill) => typeof skill === 'string')) {
      errors.push('All skills must be strings.');
    }

    return errors.length > 0 ? errors : null;
  }

  // Prepare data for API submission
  toJSON() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.confirmPassword,
      phoneNumber: this.phoneNumber,
      address: this.address,
      study: this.study,
      skills: this.skills,
    };
  }
}