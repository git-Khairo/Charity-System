import useHome from "../components/Home/useHome";
import HeroSection from "../components/Home/HeroSection";
import CharityCategories from "../components/Home/CharityCategories";
import LatestCampaigns from "../components/Home/LatestCampaigns";
import AboutUs from "../components/Home/AboutUs";
const App = () => {
  
  const { currentSlide, heroImages } = useHome();

    return (
      <div className="min-h-screen bg-[#f9f9f9] text-[#000111] font-['Open_Sans',_sans-serif]">
        <HeroSection currentSlide={currentSlide} heroImages={heroImages} />
        <CharityCategories />
        <LatestCampaigns />
        <AboutUs />
      </div>
    );
};
export default App;
