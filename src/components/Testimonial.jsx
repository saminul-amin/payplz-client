import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

export default function Testimonial({ review }) {
  const { name, role, testimonial, rating, image } = review;

  return (
    <div>
      <div className="card bg-base-200 w-2/3 mx-auto shadow-xl pt-6">
        <figure className="mx-auto">
          <img src={image} className="rounded-full w-24 h-24" />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title mx-auto">{name}</h2>
          <h2 className="card-title mx-auto italic text-gray-500 text-base">{role}</h2>
          <p>{testimonial}</p>
          <div className="card-actions justify-center">
            <Rating style={{ maxWidth: 180 }} value={rating} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}
