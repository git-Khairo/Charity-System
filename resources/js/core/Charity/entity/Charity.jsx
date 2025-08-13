// src/core/Charity/model/Charity.js
export class Charity {
  constructor({ name, description,id, category }) {
    this.name = this.validateName(name);
    this.description = this.validateDescription(description);
    this.id=id;
    // this.category = this.validateCategory(category);
  }

  validateName(name) {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Invalid or missing charity name');
    }
    return name.trim();
  }

  validateDescription(description) {
    if (!description || typeof description !== 'string') {
      throw new Error('Invalid or missing charity description');
    }
    return description.trim();
  }

//   validateCategory(category) {
//     const validCategories = [
//       'all',
//       'education',
//       'health',
//       'environment',
//       'food',
//       'animals',
//       'disaster',
//     ];
//     if (!category || !validCategories.includes(category)) {
//       throw new Error('Invalid or missing charity category');
//     }
//     return category;
//   }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      category: this.category,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
