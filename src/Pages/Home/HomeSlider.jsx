import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import img1 from '../../assets/images/carouselImg/img1.jpg';
import img2 from '../../assets/images/carouselImg/img2.jpg';
import img3 from '../../assets/images/carouselImg/img3.jpg';
import Heading from "../../components/Heading";

const HomeSlider = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop
      navigation={true}
      modules={[Autoplay, Navigation]}
      className="mySwiper rounded"
    >
      <SwiperSlide>
        <div className="min-h-[400px] bg-cover bg-center" style={{backgroundImage: `url(${img1})`}}>
          <Heading heading='Earn money buy like and follow.' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="min-h-[400px] bg-cover bg-center md:h-[500px] lg:h-[550px]" style={{backgroundImage: `url(${img2})`, backgroundPosition: 'cover'}}>
          <Heading heading='Earn money with share anything' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="min-h-[400px] bg-cover bg-center md:h-[500px] lg:h-[550px]" style={{backgroundImage: `url(${img3})`, backgroundPosition: 'cover'}}>
          <Heading heading='Earn money by click' />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeSlider;
