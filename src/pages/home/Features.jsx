import { useEffect, useState } from "react";

export default function Features() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("/features.json")
      .then((res) => res.json())
      .then((data) => setFeatures(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto dark">
      <div>
        <h2 className="text-3xl font-semibold mt-24 text-center">
          Features at a Glance
        </h2>
        <p className="text-center mt-4 mx-2 dark:text-gray-300">
          Discover the tools and features that make PayPlz your go-to platform
          <br />
          for micro-tasks and seamless collaboration.
        </p>
      </div>
      <hr className="my-4 bg-purple-950 w-9/12 md:w-6/12 mx-auto" />
      <div className="mx-6 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-4xl mb-4 ">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
