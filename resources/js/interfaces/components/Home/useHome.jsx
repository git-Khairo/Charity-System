import { useState, useEffect } from "react";

const useHome = () => {
  const heroImages = [
    {
      url: "https://readdy.ai/api/search-image?query=Emotional%20image%20of%20diverse%20volunteers%20helping%20communities%20in%20need%2C%20with%20warm%20lighting%20and%20genuine%20human%20connection%2C%20showing%20hands%20reaching%20out%20to%20help%20others%2C%20professional%20photography%20with%20soft%20natural%20lighting%20and%20blurred%20background&width=800&height=800&seq=1&orientation=landscape",
      alt: "Volunteers helping communities",
    },
    {
      url: "https://readdy.ai/api/search-image?query=Children%20receiving%20education%20in%20a%20rural%20school%20setting%20with%20hopeful%20expressions%2C%20natural%20lighting%20through%20windows%2C%20teachers%20helping%20students%20learn%2C%20inspirational%20moment%20of%20knowledge%20sharing%20with%20simple%20classroom%20background&width=800&height=800&seq=2&orientation=landscape",
      alt: "Children receiving education",
    },
    {
      url: "https://readdy.ai/api/search-image?query=Medical%20volunteers%20providing%20healthcare%20services%20in%20underserved%20areas%2C%20doctors%20examining%20patients%20with%20care%20and%20compassion%2C%20medical%20equipment%20visible%2C%20warm%20lighting%20creating%20hopeful%20atmosphere%20against%20simple%20clinic%20background&width=800&height=800&seq=3&orientation=landscape",
      alt: "Medical volunteers providing healthcare",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]); // Added dependency to useEffect

  return { currentSlide, heroImages };
};

export default useHome;