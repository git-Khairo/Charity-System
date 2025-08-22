export class Campaign {
  constructor({ title, location, status, category, charity_id,id,description, images, capacity, NumOfVolunteer }) {
    this.charityId = this.validateCharityId(charity_id);
    this.title = this.validateTitle(title);
    this.description = description;
    this.location = this.validateLocation(location);
    this.status = this.validateStatus(status);
    this.category = this.validateCategoryName(category);
    this.id=id;
    this.images = images;
    this.capacity = capacity;
    this.NumOfVolunteer = NumOfVolunteer;
  }

  validateCharityId(charity_id) {
    if (!charity_id || typeof charity_id !== 'number' || charity_id === 0) {
      throw new Error('Invalid or missing charity ID');
    }
    return charity_id;
  }

  validateTitle(title) {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      throw new Error('Invalid or missing campaign title');
    }
    return title.trim();
  }

  validateCategoryName(categoryName) {
    if (!categoryName || typeof categoryName !== 'string' || categoryName.trim().length === 0) {
      throw new Error('Invalid or missing campaign categoryName');
    }
    return categoryName.trim().toLowerCase();
  }

  // validateDescription(description) {
  //   if (!description || typeof description !== 'string') {
  //     throw new Error('Invalid or missing campaign description');
  //   }
  //   return description.trim();
  // }

  validateLocation(location) {
    if (!location || typeof location !== 'string' || location.trim().length === 0) {
      throw new Error('Invalid or missing campaign location');
    }
    return location?.trim();
  }

  validateStatus(status) {
    const validStatuses = ['active', 'completed', 'upcoming'];
    if (!status || !validStatuses.includes(status)) {
      throw new Error('Invalid or missing campaign status');
    }
    return status.trim();
  }

  toJSON() {
    return {
      charity_id: this.charityId,
      title: this.title,
      description: this.description,
      location: this.location,
      status: this.status,
      capacity: this.capacity,
      NumOfVolunteer: this.numOfVolunteers,
    };
  }
}
