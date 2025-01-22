import AvailableTask from "./AvailableTask";
import BestWorkers from "./BestWorkers";
import Faq from "./Faq";
import HomeSlider from "./HomeSlider";
import States from "./States";
import Testimonial from "./Testimonial";


const Home = () => {
  return (
    <>
      <HomeSlider />
      <States />
      <AvailableTask />
      <BestWorkers />
      <Testimonial />
      <Faq />
    </>
  );
};

export default Home;