import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CharityCard = ({ charity, categories }) => {
    // Helper to get category name
    const getCategoryName = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : "Unknown";
    };

    // Helper to get category color class (consider moving these colors to a config/utility file)
    const getCategoryColorClass = (categoryId) => {
        switch (categoryId) {
            case "education":
            case "health":
            case "environment":
            case "food":
            case "animals":
            case "disaster":
                return "bg-[#97c9ea] text-[#002366]";
            default:
                return "bg-[#97c9ea] text-[#002366]";
        }
    };

    return (
        <Link to={`/charity/${charity.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg border border-[#97c9ea]"
        >
            <div className="h-48 overflow-hidden">
                <img
                   src={charity.images}
                    alt={charity.name}
                    className="w-full h-full object-cover object-top"
                />
            </div>
            <div className="p-5">
                <div className="mb-4">
                    <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColorClass(charity.category)}`}
                    >
                        {getCategoryName(charity.category)}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-[#000111] mb-2 line-clamp-2">
                    {charity.name}
                  </h3>
                  <p className="text-[#000111] mb-4 line-clamp-3">
                    {charity.description}
                  </p>
               <div className="flex justify-between items-center mt-auto">
                    <button className="flex justify-center items-center !rounded-button whitespace-nowrap text-[#002366] py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
                      View Details
                      <FaChevronRight />
                    </button>
                    <Link to={`/donate/${charity.id}?img=${charity.images}`} className="!rounded-button whitespace-nowrap bg-[#97c9ea] hover:bg-[#7ab9e0] text-[#002366] py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
                      Donate
                    </Link>
                  </div>
            </div>
        </Link>
    );
};

export default CharityCard;