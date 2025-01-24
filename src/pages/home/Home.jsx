import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Testimonials from "./Testimonials";
import BestWorkers from "./BestWorkers";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | PayPlz</title>
      </Helmet>
      <Banner />
      <BestWorkers />
      <Testimonials />
    </div>
  );
}
