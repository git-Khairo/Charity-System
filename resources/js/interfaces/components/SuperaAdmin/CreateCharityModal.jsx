import { useState } from "react";
import usePost from "../../../services/API/usePost";
import { RxIconjarLogo } from "react-icons/rx";

export default function CreateCharityModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [charityData, setCharityData] = useState({
    admin_id: "",
    category_id: "",
    nameEn: "",
    nameAr: "",
    addressEn: "",
    addressAr: "",
    descriptionEn: "",
    descriptionAr: "",
    phonenumber: "",
    email: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const { post, loading } = usePost();

  const englishRegex = /^[A-Za-z0-9\s.,'-]+$/;
  const arabicRegex = /^[\u0600-\u06FF\s.,'-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharityData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const validateStep = (currentStep) => {
    const stepErrors = {};
    if (currentStep === 1) {
      if (!charityData.admin_id || isNaN(Number(charityData.admin_id)))
        stepErrors.admin_id = "Enter a valid admin ID";
      if (!charityData.category_id || isNaN(Number(charityData.category_id)))
        stepErrors.category_id = "Enter a valid category ID";
      if (!charityData.nameEn || !englishRegex.test(charityData.nameEn))
        stepErrors.nameEn = "Enter a valid English name (max 255 characters)";
      if (!charityData.addressEn || !englishRegex.test(charityData.addressEn))
        stepErrors.addressEn = "Enter a valid English address (max 500 characters)";
      if (!charityData.descriptionEn || !englishRegex.test(charityData.descriptionEn))
        stepErrors.descriptionEn = "Enter a valid English description";
      if (!charityData.phonenumber || !phoneRegex.test(charityData.phonenumber))
        stepErrors.phonenumber = "Enter a valid phone number";
      if (!charityData.email || !emailRegex.test(charityData.email))
        stepErrors.email = "Enter a valid email address";
      if (imageFiles.length === 0)
        stepErrors.images = "Please upload at least one image";
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

    try {
      setUploading(true);

      // Upload images to Laravel
      const uploadedImages = [];
      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("filename", `charity_${Date.now()}`);
        formData.append("directory", "charities");

        const res = await fetch("http://127.0.0.1:8000/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errData = await res.json();
          console.error("Upload error:", errData);
          setErrors({ images: "Image upload failed. Try again." });
          setUploading(false);
          return;
        }

        const data = await res.json();
        uploadedImages.push(data.url);
      }

      const payload = {
        admin_id: Number(charityData.admin_id),
        category_id: Number(charityData.category_id),
        name: { en: charityData.nameEn, ar: charityData.nameAr },
        address: { en: charityData.addressEn, ar: charityData.addressAr },
        description: { en: charityData.descriptionEn, ar: charityData.descriptionAr },
        images: uploadedImages,
        phonenumber: charityData.phonenumber,
        email: charityData.email,
      };

      await post("/api/charities", payload);
      setUploading(false);
      onClose();
    } catch (err) {
      console.error("Error creating charity:", err);
      setErrors({ submit: "Failed to create charity. Please try again." });
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <RxIconjarLogo className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold mb-2">Create Charity</h2>
        <p className="text-gray-500 mb-4">Fill all required fields.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <input
                type="number"
                name="admin_id"
                placeholder="Admin ID"
                value={charityData.admin_id}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.admin_id && <p className="text-red-500 text-sm">{errors.admin_id}</p>}

              <input
                type="number"
                name="category_id"
                placeholder="Category ID"
                value={charityData.category_id}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}

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
                type="text"
                name="phonenumber"
                placeholder="Phone Number"
                value={charityData.phonenumber}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber}</p>}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={charityData.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <input
                type="file"
                multiple
                onChange={handleImageChange}
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

          <div className="flex justify-between mt-4">
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
                disabled={loading || uploading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {loading || uploading ? "Creating..." : "Create"}
              </button>
            )}
          </div>
          {errors.submit && <p className="text-red-500 text-sm mt-2">{errors.submit}</p>}
        </form>
      </div>
    </div>
  );
}