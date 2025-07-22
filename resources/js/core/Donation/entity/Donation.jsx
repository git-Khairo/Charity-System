// core/domain/entities/Donation.js

export class Donation {
  constructor({ name, email, phonenumber, address, amount }) {
    this.name = name;
    this.email = email;
    this.phonenumber = phonenumber;
    this.address = address;
    this.amount = amount;
  }

  validate() {
    const errors = {};

    if (!this.name || typeof this.name !== 'string' || this.name.length > 255) {
      errors.name = 'Full Name is required and must be less than 255 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailRegex.test(this.email)) {
      errors.email = 'A valid email is required.';
    }

    const phoneRegex = /^[0-9\-\+\s\(\)]{7,15}$/;
    if (!this.phonenumber || !phoneRegex.test(this.phonenumber)) {
      errors.phonenumber = 'Phone number is required and must be valid.';
    }

    if (!this.address || typeof this.address !== 'string' || this.address.length > 255) {
      errors.address = 'Address is required and must be less than 255 characters.';
    }

    if (!this.amount || typeof this.amount !== 'number' || this.amount <= 0) {
      errors.amount = 'Amount must be a positive number.';
    }

    return errors;
  }

  toJSON() {
    return {
      name: this.name,
      email: this.email,
      phonenumber: this.phonenumber,
      address: this.address,
      amount: this.amount,
    };
  }
}
