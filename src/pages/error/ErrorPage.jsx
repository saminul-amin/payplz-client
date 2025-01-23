import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <Helmet>
        <title>404 Error | PayPlz</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4">
        <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
          Oops!
        </h1>

        <p className="mt-4 text-2xl font-semibold text-gray-800">
          404 - PAGE NOT FOUND
        </p>
        <p className="mt-2 text-gray-600 max-w-md">
          We Are Extremely Sorry, But The Page You Requested
          <br /> Was Not Found!
        </p>

        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
        >
          GO TO HOMEPAGE
        </Link>
      </div>
    </>
  );
}
