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
        <div
          className="min-h-[400px] bg-black bg-opacity-60 bg-blend-overlay flex justify-center items-center text-white bg-cover h-[60vh] lg:h-[80vh]"
          style={{ backgroundImage: `url(${img1})` }}
        >
          <Heading heading="Earn money buy like and follow." title='You should like and follow the post or youtube video given by buyer.' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="min-h-[400px] bg-black bg-opacity-60 bg-blend-overlay flex justify-center items-center text-white bg-cover h-[60vh] lg:h-[80vh]"
          style={{
            backgroundImage: `url(${img2})`,
            backgroundPosition: "cover",
          }}
        >
          <Heading heading="Earn money with share anything" title='Buyer will give to link or anything to share to your friends, family, reletive or neighbours, You have share this to them and get your rewards.' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="min-h-[400px] bg-black bg-opacity-60 bg-blend-overlay flex justify-center items-center text-white bg-cover h-[60vh] lg:h-[80vh]"
          style={{
            backgroundImage: `url(${img3})`,
            backgroundPosition: "cover",
          }}
        >
          <Heading heading="Earn money by click" title='Buyer should give you something task, if you fill it properly then you will get your rewards.' />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeSlider;
