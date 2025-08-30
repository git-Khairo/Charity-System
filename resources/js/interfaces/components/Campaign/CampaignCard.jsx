import { Link } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
  return (
    <Link to={`/campaign/${campaign.id}`} className="bg-white dark:bg-dark-background2 rounded-lg shadow-sm overflow-hidden transition-transform hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img
          src={campaign.images[0]}
          alt={campaign.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
              campaign.status === "Active"
                ? "bg-green-100 text-green-800"
                : campaign.status === "Completed"
                ? "bg-gray-100 text-gray-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {campaign.status}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {campaign.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 dark:text-white">{campaign.description}</p>

        <button className="w-full bg-blue-500 hover:bg-blue-600 dark:text-white text-white py-2 px-4 rounded-md transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer">
          View Campaign
        </button>
      </div>
    </Link>
  );
};

export default CampaignCard;
