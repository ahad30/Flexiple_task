import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { useGetTestimonialsQuery } from "@/redux/Feature/testmonialApi";

const Slider = () => {
  const { data, error, isLoading } = useGetTestimonialsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load testimonials.</p>;

  return (
    <div className="bg-[#050505]">
     <h1 className="text-5xl font-bold mb-12 text-center text-white">100+ fast-growing companies love Flexiple!</h1>
     <p className="text-xl font-bold mb-12 text-center text-[#9B9B9C] w-[800px] mx-auto">
     Team work makes dreamwork. Flexiple helps companies build the best possible team by scouting and identifying the best fit.
     </p>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {data.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <section className="mt-10 mb-10">
              <div className="flex justify-center">
                {/* Card content */}
                <div className="lg:w-1/2">
                  <div className="bg-[#120D17] p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-primary">{testimonial.name}</h2>
                    <h3 className="text-xl text-gray-600">{testimonial.designation}</h3>
                    <p className="mt-4 text-white leading-8">{testimonial.description}</p>
                  </div>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
