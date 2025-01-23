import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

export default function Payment() {
  
  return (
    <div>
      <Helmet>
        <title>Payment | PayPlz</title>
      </Helmet>
      <div>
        <h2 className="text-3xl font-semibold mb-8">Payment</h2>
        <div className="w-1/2 mx-auto">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
}
