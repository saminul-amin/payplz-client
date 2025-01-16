import { useEffect, useState } from "react";
import Testimonial from "../../components/Testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/testimonials.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Testimonials</h2>
        <p className="text-gray-700 mt-2">
          Hear from our users about their experiences with PayPlz.
          <br />
          From freelancers to business owners, discover how we’re making a
          difference!
        </p>
      </div>
      {/* {testimonials.length} */}
      <hr className="my-4 bg-purple-950 w-6/12 mx-auto" />
      <div className="mx-auto">
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((review, idx) => (
            <SwiperSlide key={idx}>
              <Testimonial review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
