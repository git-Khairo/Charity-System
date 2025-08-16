import { useState } from "react";
import useMakeFeedback from "../../../core/Beneficiary/usecase/useMakeFeedback";


const FeedbackModal = ({ isOpen, onClose, url, onSuccess, volunteerId, beneficiaryId, charityId ,eventId}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);

    const { submitFeedback, loading, error } = useMakeFeedback(url);
    console.log(url);
    const handleStarClick = (star) => setRating(star);

    const handleSubmit = async () => {
        const formData = {
            ...(charityId && { charity_id: volunteerId }),
            ...(eventId && { event_id: eventId }),
            title,
            description,
            rating,
            ...(volunteerId && { volunteer_id: volunteerId }),
            ...(beneficiaryId && { beneficiary_id: beneficiaryId }),
        };

        try {
            await submitFeedback(formData);
            onSuccess?.();
            onClose();
            setTitle("");
            setDescription("");
            setRating(0);
        } catch (err) {
            console.error(err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h3 className="text-lg font-bold mb-4">Give Feedback</h3>

                {error && <p className="text-red-500 mb-3">{error.message || error}</p>}

                <input
                    type="text"
                    placeholder="Feedback Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                />

                <textarea
                    placeholder="Your feedback..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                />

                <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleStarClick(star)}
                            className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                        >
              ★
            </span>
                    ))}
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg" disabled={loading}>
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-lg" disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;
