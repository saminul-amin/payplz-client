import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

export default function WorkerHome() {
  const { user } = useAuth();
  const [totalSubmission, setTotalSubmission] = useState(0);
  const [pendingSubmission, setPendingSubmission] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [submissions, setSubmissions] = useState([]);
  const axiosPublic = useAxiosPublic();

  axiosPublic.get("/submission/total-number").then((result) => {
    setTotalSubmission(result.data.totalSubmission);
    setPendingSubmission(result.data.pendingSubmission);
    setTotalEarning(result.data.totalEarning);
  });

  axiosPublic.get(`/submissions/${user.email}`).then((result) => {
    setSubmissions(result.data);
  });
  const approvedSubmissions = submissions.filter(
    (stat) => stat.status === "approved"
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between font-semibold text-lg xl:text-2xl">
        <p>Total Submission: {totalSubmission}</p>
        <p>Pending Submission: {pendingSubmission}</p>
        <p>Total Earning: {totalEarning}</p>
      </div>
      <div>
        <h2 className="text-3xl font-semibold mt-12">Approved Submission</h2>
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
                {approvedSubmissions.map((submission, idx) => (
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
    </div>
  );
}
