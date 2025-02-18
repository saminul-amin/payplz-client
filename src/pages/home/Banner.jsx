import { Carousel } from "react-responsive-carousel";
import Lottie from "lottie-react";
import lottie2 from "./../../assets/2.json";
import lottie1 from "./../../assets/1.json";
import lottie3 from "./../../assets/3.json";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Banner() {
  return (
    <div className="mt-24 w-2/3 mx-auto max-w-4xl">
      <Carousel autoPlay interval={5000} infiniteLoop>
        <div className="flex items-center justify-around">
          <div>
            <h2 className="text-3xl font-semibold">Transform Your Ideas</h2>
            <p>Build the Future with Innovative Solutions</p>
          </div>
          <div className="h-64">
            <Lottie
              animationData={lottie2}
              loop={true}
              style={{ height: "240px" }}
            />
          </div>
        </div>
        <div className="flex items-center justify-around">
          <div>
            <h2 className="text-3xl font-semibold">Seamless Experiences</h2>
            <p>User-Centric Designs for Every Need</p>
          </div>
          <div>
            <Lottie
              animationData={lottie1}
              loop={true}
              style={{ height: "240px" }}
            />
          </div>
        </div>
        <div className="flex items-center justify-around">
          <div>
            <h2 className="text-3xl font-semibold">Beyond Boundaries</h2>
            <p>Empowering You with Limitless Opportunities</p>
          </div>
          <div>
            <Lottie
              animationData={lottie3}
              loop={true}
              style={{ height: "240px" }}
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
