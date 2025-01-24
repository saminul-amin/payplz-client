import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

export default function MySubmissions() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();

  axiosSecure.get(`/submissions/${user.email}`).then((result) => {
    setSubmissions(result.data);
  });

  // Pagination Items
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = submissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(submissions.length / itemsPerPage);

  return (
    <div>
      <Helmet>
        <title>My Submissions | PayPlz</title>
      </Helmet>
      <h2 className="text-3xl font-semibold">My Submissions</h2>
      <div className="mt-6">
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-lg font-semibold">
                <th>#</th>
                <th>Task Title</th>
                <th>Task Details</th>
                <th>Buyer's Email</th>
                <th>Submission Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {currentItems.map((submission, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{submission.title}</td>
                  <td>{submission.details}</td>
                  <td>{submission.email}</td>
                  <td>{submission.submissionDetails}</td>
                  <td>{submission.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <div className="btn-group">
            {[...Array(totalPages).keys()].map((_, idx) => (
              <button
                key={idx + 1}
                className={`btn ${currentPage === idx + 1 ? "btn-active" : ""}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
