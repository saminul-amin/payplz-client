import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="mt-16 pb-4 text-center bg-base-100 rounded-t-2xl">
      <hr className="my-5 w-6/12 mx-auto" />
      <h2 className="pt-4 text-3xl font-bold">PayPlz</h2>
      <p className="text-gray-500 mx-3 md:mx-0 my-6 font-semibold text-lg">
        Complete tasks, earn rewards, and empower your journey <br />
        one micro-step at a time with PayPlz
      </p>
      {/* <hr className="my-5 w-11/12 mx-auto" /> */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-24 justify-center">
        <div>
          <h6 className="font-bold text-lg mb-4">Services</h6>
          <ul>
            <li>Feedback & Support</li>
            <li>Discover Services</li>
            <li>Submit a review</li>
            <li>How it works</li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold text-lg mb-4">Company</h6>
          <ul>
            <li>About Us</li>
            <li>Other Projects</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold text-lg mb-4">Legal</h6>
          <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center gap-12 mt-8 text-4xl">
        <FaFacebookF />
        <FaXTwitter />
        <FaYoutube />
        <FaInstagram />
      </div>
      <div className="footer footer-center bg-base-100 text-base-content px-4 pt-4 pb-2">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            <strong> PayPlz</strong>
          </p>
        </aside>
      </div>
    </div>
  );
}
