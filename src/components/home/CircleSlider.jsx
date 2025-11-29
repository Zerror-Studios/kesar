import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";

const items = [
  "Backward Integration",
  "Phthalocyanine Pigments",
  "Forward Integration",
  "Backward Integration",
  "Phthalocyanine Pigments",
  "Forward Integration",
];

const CircleSlider = () => {
  return (
   <div id="circle_slider">
     <Swiper
      slidesPerView={3}
      centeredSlides={true}
      loop={true}
      spaceBetween={0}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      modules={[Autoplay, Navigation]}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="slide-content">{item}</div>
        </SwiperSlide>
      ))}
    </Swiper>
   </div>
  );
};

export default CircleSlider;
