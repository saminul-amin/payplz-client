import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Testimonials from "./Testimonials";
import BestWorkers from "./BestWorkers";
import Packages from "./Packages";
import { ToastContainer } from "react-toastify";
import HowItWorks from "./HowItWorks";
import Features from "./Features";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | PayPlz</title>
      </Helmet>
      <Banner />
      <BestWorkers />
      <Packages />
      <HowItWorks />
      <Features />
      <Testimonials />
      <ToastContainer />
    </div>
  );
}
