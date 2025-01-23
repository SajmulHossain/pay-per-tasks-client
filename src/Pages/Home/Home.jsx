import { Helmet } from "react-helmet-async";
import AvailableTask from "./AvailableTask";
import BestWorkers from "./BestWorkers";
import Faq from "./Faq";
import HomeSlider from "./HomeSlider";
import States from "./States";
import Testimonial from "./Testimonial";


const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home || Pay Per Tasks</title>
      </Helmet>
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