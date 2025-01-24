import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("/packages.json")
      .then((res) => res.json())
      .then((data) => setPackages(data));
  }, []);

  return (
    <div>
      <div>
        <h2 className="text-3xl font-semibold mt-24 text-center">Packages</h2>
        <p className="text-center mt-4">
          Discover the Ideal Plan to Elevate Your Earnings,
          <br /> Access Premium Features, and Achieve More
        </p>
      </div>
      <hr className="my-4 bg-purple-950 w-9/12 md:w-6/12 mx-auto" />
      <div className="mt-12 grid gap-8 md:grid-cols-3 max-w-7xl mx-auto px-6">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-lg p-6 hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              {pkg.name}{" "}
              {pkg.name === "Task Pro" && (
                <span className="italic uppercase text-gray-600 text-sm">
                  (Recommended)
                </span>
              )}
            </h3>
            <p className="mt-4 text-xl font-bold text-blue-600">{pkg.price}</p>
            <ul className="mt-6 space-y-2 text-gray-600">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-green-500">✔</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => toast("Dummy Button! It won't work dear!")}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
