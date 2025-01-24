import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

export default function WorkerHome() {
  const { user } = useAuth();
  const [totalSubmission, setTotalSubmission] = useState(0);
  const [pendingSubmission, setPendingSubmission] = useState(0);
  const [submissions, setSubmissions] = useState([]);
  const axiosSecure = useAxiosSecure();

  axiosSecure.get("/submission/total-number").then((result) => {
    setTotalSubmission(result.data.totalSubmission);
    setPendingSubmission(result.data.pendingSubmission);
  });

  axiosSecure.get(`/submissions/${user.email}`).then((result) => {
    setSubmissions(result.data);
  });
  const approvedSubmissions = submissions.filter(
    (stat) => stat.status === "approved"
  );
  let totalEarning = 0;
  approvedSubmissions.map((submission) => {
    totalEarning += parseInt(submission.payableAmount);
  });

  return (
    <div>
      <Helmet>
        <title>Worker Home | PayPlz</title>
      </Helmet>
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
                  <th className="text-center">Payable Amount</th>
                  <th>Buyer's Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {approvedSubmissions.map((submission, idx) => (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>{submission.title}</td>
                    <td className="text-center">{submission.payableAmount}</td>
                    <td>{submission.email}</td>
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
