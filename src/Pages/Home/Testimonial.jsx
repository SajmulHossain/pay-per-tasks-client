import { useQuery } from '@tanstack/react-query';
import Heading from '../../components/Heading';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Testimonial = () => {
  const {data:reviews = [...Array(10)], isLoading} = useQuery({
    queryKey: ['reviews'],
    queryFn: async() => {
      const { data }= await axios.get('review.json');
      return data;
    }
  })

  
  return (
    <section className="section">
      <Heading heading="Testimonial" title="Our honorable customers brief" />

      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop
          navigation={true}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={Math.random()}>
              {isLoading ? (
                <div className='flex flex-col items-center gap-4'>
                  <div className='skeleton h-52 w-52 rounded-full'></div>
                    <div className="skeleton h-12 w-40"></div>

                  <div className="skeleton h-10 w-10/12 mx-auto rounded"></div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div>
                    <img
                      src={review?.photo}
                      className="h-52 rounded-full object-cover"
                      alt={`${review?.name}'s photo`}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-xl">{review?.name}</h3>
                    <p className="opacity-70 text-sm italic">{review?.role}</p>
                  </div>

                  <p className="italic text-lg w-10/12 mx-auto text-center">{`"${review?.quote}"`}</p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;