// core/domain/entities/Donation.js

export class Donation {
  constructor({ fullName, email, phone, city, amount }) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.city = city;
    this.amount = amount;
  }

  validate() {
    const errors = [];

    if (!this.fullName || typeof this.fullName !== 'string' || this.fullName.length > 255) {
      errors.push('Full Name is required and must be less than 255 characters.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailRegex.test(this.email)) {
      errors.push('A valid email is required.');
    }

    const phoneRegex = /^[0-9\-\+\s\(\)]{7,15}$/;
    if (!this.phone || !phoneRegex.test(this.phone)) {
      errors.push('Phone number is required and must be valid.');
    }

    if (!this.city || typeof this.city !== 'string' || this.city.length > 255) {
      errors.push('City is required and must be less than 255 characters.');
    }

    if (!this.amount || typeof this.amount !== 'number' || this.amount <= 0) {
      errors.push('Amount must be a positive number.');
    }

    return errors.length > 0 ? errors : null;
  }

  toJSON() {
    return {
      name: this.fullName,
      email: this.email,
      phonenumber: this.phone,
      address: this.city,
      amount: this.amount,
    };
  }
}
