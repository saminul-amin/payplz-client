export default function HowItWorks() {
  return (
    <div className="max-w-6xl mx-auto">
      <div>
        <h2 className="text-3xl font-semibold mt-24 text-center">
          How It Works
        </h2>
        <p className="text-center mt-4">
          A simple guide to help you understand the process of
          <br /> posting tasks, browsing, completing, and earning
        </p>
      </div>
      <hr className="my-4 bg-purple-950 w-9/12 md:w-6/12 mx-auto" />
      <div className="mt-6 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="text-4xl text-blue-500 mb-4">📑</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Post a Task
          </h3>
          <p className="text-gray-600">
            Buyers create tasks with all the necessary details for workers to
            complete.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="text-4xl text-blue-500 mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Browse Tasks
          </h3>
          <p className="text-gray-600">
            Workers can browse and select tasks that match their skills and
            interests.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="text-4xl text-blue-500 mb-4">🛠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Complete the Task
          </h3>
          <p className="text-gray-600">
            Workers complete the task according to the requirements and submit
            it for review.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="text-4xl text-blue-500 mb-4">💸</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Earn & Get Paid
          </h3>
          <p className="text-gray-600">
            Once completed, workers receive payment, and buyers can rate the
            service provided.
          </p>
        </div>
      </div>
    </div>
  );
}
