import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const axiosPublic = useAxiosPublic();

  axiosPublic.get("/submissions").then((result) => {
    setSubmissions(result.data);
  });

  return (
    <div>
      <h2 className="text-3xl font-semibold">My Submissions</h2>
      <div className="mt-6">
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-lg font-semibold">
                <th>#</th>
                <th>Task Title</th>
                <th className="text-center">Task Details</th>
                <th className="text-center">Buyer's Email</th>
                <th className="text-center">Submission Details</th>
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
                  <td>
                    {submission.submissionDetails}
                  </td>
                  <td className="text-center">{submission.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
