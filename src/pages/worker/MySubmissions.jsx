import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

export default function MySubmissions() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const axiosSecure = useAxiosSecure();

  axiosSecure.get(`/submissions/${user.email}`).then((result) => {
    setSubmissions(result.data);
  });

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
              {submissions.map((submission, idx) => (
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
      </div>
    </div>
  );
}
