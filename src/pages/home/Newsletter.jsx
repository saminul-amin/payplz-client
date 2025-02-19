const Newsletter = () => {
  return (
    <div className="mx-4 sm:mx-6 md:mx-12">
      <section className="bg-base-200 dark:bg-gray-800 mt-24 py-12 px-6 md:px-12 rounded-2xl shadow-lg mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Stay Updated with PayPlz!</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 md:px-48">
            Subscribe to our newsletter and never miss an update on new tasks,
            earnings, and platform improvements.
          </p>
        </div>

        <form className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 w-full md:w-2/3 rounded-lg text-gray-900 focus:outline-none border-gray-600 border-2"
            required
          />
          <button
            type="submit"
            className="bg-gray-300 dark:bg-gray-500 hover:bg-slate-400 dark:hover:bg-gray-700 transition px-6 py-3 rounded-lg font-semibold"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default Newsletter;
