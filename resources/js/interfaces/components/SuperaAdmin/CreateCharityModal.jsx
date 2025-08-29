import { useState } from "react";
import { RxIconjarLogo } from "react-icons/rx";

export default function CreateCharityModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [charityData, setCharityData] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    category: "",
    nameEn: "",
    nameAr: "",
    addressEn: "",
    addressAr: "",
    descriptionEn: "",
    descriptionAr: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const englishRegex = /^[A-Za-z0-9\s.,'-]+$/;
  const arabicRegex = /^[\u0600-\u06FF\s.,'-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]\d{1,14}$/; // Aligned with backend
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const categories = ['Health', 'Education', 'Food', 'Shelter', 'Disaster Relief'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharityData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size (2MB max)
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, images: "Please upload a JPEG, PNG, JPG, or GIF image" }));
        setImageFile(null);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, images: "Image size must not exceed 2MB" }));
        setImageFile(null);
        return;
      }
      setErrors((prev) => ({ ...prev, images: null }));
      setImageFile(file);
    }
  };

  const validateStep = (currentStep) => {
    const stepErrors = {};
    if (currentStep === 1) {
      if (!charityData.name || !englishRegex.test(charityData.name))
        stepErrors.name = "Enter a valid name";
      if (!charityData.email || !emailRegex.test(charityData.email))
        stepErrors.email = "Enter a valid email address";
      if (!charityData.password || !passwordRegex.test(charityData.password))
        stepErrors.password = "Password must be at least 8 characters with letters and numbers";
      if (!charityData.phonenumber || !phoneRegex.test(charityData.phonenumber))
        stepErrors.phonenumber = "Enter a valid phone number (1-9 followed by 1-14 digits)";
      if (!charityData.category)
        stepErrors.category = "Please select a category";
      if (!charityData.nameEn || !englishRegex.test(charityData.nameEn))
        stepErrors.nameEn = "Enter a valid English name (max 255 characters)";
      if (!charityData.addressEn || !englishRegex.test(charityData.addressEn))
        stepErrors.addressEn = "Enter a valid English address (max 500 characters)";
      if (!charityData.descriptionEn || !englishRegex.test(charityData.descriptionEn))
        stepErrors.descriptionEn = "Enter a valid English description";
      if (!imageFile)
        stepErrors.images = "Please upload an image";
    } else if (currentStep === 2) {
      if (!charityData.nameAr || !arabicRegex.test(charityData.nameAr))
        stepErrors.nameAr = "أدخل اسمًا صحيحًا (بحد أقصى 255 حرفًا)";
      if (!charityData.addressAr || !arabicRegex.test(charityData.addressAr))
        stepErrors.addressAr = "أدخل عنوانًا صحيحًا (بحد أقصى 500 حرف)";
      if (!charityData.descriptionAr || !arabicRegex.test(charityData.descriptionAr))
        stepErrors.descriptionAr = "أدخل وصفًا صحيحًا";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    // Check all required fields
    const requiredFields = [
      charityData.name,
      charityData.email,
      charityData.password,
      charityData.phonenumber,
      charityData.category,
      charityData.nameEn,
      charityData.nameAr,
      charityData.addressEn,
      charityData.addressAr,
      charityData.descriptionEn,
      charityData.descriptionAr,
    ];
    if (requiredFields.some(field => !field)) {
      setErrors({ submit: "Please fill all required fields before submitting." });
      return;
    }
    if (!imageFile) {
      setErrors({ submit: "Please upload an image." });
      return;
    }

    try {
      setUploading(true);

      // Create FormData
      const formData = new FormData();
      formData.append('name', charityData.name);
      formData.append('email', charityData.email);
      formData.append('password', charityData.password);
      formData.append('phonenumber', charityData.phonenumber);
      formData.append('category', charityData.category);
      formData.append('name_translations[en]', charityData.nameEn);
      formData.append('name_translations[ar]', charityData.nameAr);
      formData.append('address[en]', charityData.addressEn);
      formData.append('address[ar]', charityData.addressAr);
      formData.append('description[en]', charityData.descriptionEn);
      formData.append('description[ar]', charityData.descriptionAr);
      formData.append('images', imageFile);

      // Log FormData contents
      console.log('FormData contents:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value instanceof File ? {
          name: value.name,
          size: value.size,
          type: value.type
        } : value);
      }

      // Send request
      const response = await fetch("/api/charity/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
          "Accept": "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend errors:', errorData);
        throw new Error(errorData.message || "Failed to create charity");
      }

      setUploading(false);
      onClose();
    } catch (err) {
      console.error("Error creating charity:", err);
      setErrors({ submit: err.message || "Failed to create charity. Please try again." });
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl w-full max-w-md relative flex flex-col" style={{ height: '600px' }}>
        <div className="flex-shrink-0 p-6 pb-0">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <RxIconjarLogo className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold mb-2">Create Charity</h2>
          <p className="text-gray-500 mb-4">Fill all required fields.</p>
        </div>
        <div className="flex-grow overflow-y-auto px-6">
          <form id="charity-form" onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Admin Name"
                  value={charityData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                <input
                  type="email"
                  name="email"
                  placeholder="Admin Email"
                  value={charityData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <input
                  type="password"
                  name="password"
                  placeholder="Admin Password"
                  value={charityData.password}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                <input
                  type="text"
                  name="phonenumber"
                  placeholder="Admin Phone Number"
                  value={charityData.phonenumber}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber}</p>}

                <select
                  name="category"
                  value={charityData.category}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

                <input
                  type="text"
                  name="nameEn"
                  placeholder="Name (English)"
                  value={charityData.nameEn}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.nameEn && <p className="text-red-500 text-sm">{errors.nameEn}</p>}

                <input
                  type="text"
                  name="addressEn"
                  placeholder="Address (English)"
                  value={charityData.addressEn}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.addressEn && <p className="text-red-500 text-sm">{errors.addressEn}</p>}

                <textarea
                  name="descriptionEn"
                  placeholder="Description (English)"
                  value={charityData.descriptionEn}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.descriptionEn && <p className="text-red-500 text-sm">{errors.descriptionEn}</p>}

                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  className="w-full border rounded px-3 py-2"
                />
                {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="text"
                  name="nameAr"
                  placeholder="الاسم"
                  value={charityData.nameAr}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.nameAr && <p className="text-red-500 text-sm">{errors.nameAr}</p>}

                <input
                  type="text"
                  name="addressAr"
                  placeholder="العنوان"
                  value={charityData.addressAr}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.addressAr && <p className="text-red-500 text-sm">{errors.addressAr}</p>}

                <textarea
                  name="descriptionAr"
                  placeholder="الوصف"
                  value={charityData.descriptionAr}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.descriptionAr && <p className="text-red-500 text-sm">{errors.descriptionAr}</p>}
              </>
            )}
          </form>
        </div>
        <div className="flex-shrink-0 px-6 pt-4">
          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Back
              </button>
            )}
            {step < 2 && (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Next
              </button>
            )}
            {step === 2 && (
              <button
                type="submit"
                disabled={uploading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                form="charity-form"
              >
                {uploading ? "Creating..." : "Create"}
              </button>
            )}
          </div>
          {errors.submit && <p className="text-red-500 text-sm mt-2">{errors.submit}</p>}
        </div>
      </div>
    </div>
  );
}