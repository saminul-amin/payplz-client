import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Banner() {
  return (
    <div className="mt-12">
      <Carousel autoPlay interval={5000} infiniteLoop>
        <div>
          <h2 className="text-3xl font-semibold">Transform Your Ideas</h2>
          <p>Build the Future with Innovative Solutions</p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold">Seamless Experiences</h2>
          <p>User-Centric Designs for Every Need</p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold">Beyond Boundaries</h2>
          <p>Empowering You with Limitless Opportunities</p>
        </div>
      </Carousel>
    </div>
  );
}
