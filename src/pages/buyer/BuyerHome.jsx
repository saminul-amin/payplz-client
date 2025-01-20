import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

export default function BuyerHome() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [totalTask, setTotalTask] = useState(0);
  const [pendingTask, setPendingTask] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const axiosPublic = useAxiosPublic();

  const openModal = (data) => {
    setIsModalOpen(true);
    setModalInfo(data);
  };
  const closeModal = () => setIsModalOpen(false);

  axiosPublic.get("/tasks/worker").then((result) => {
    setTotalTask(result.data.totalTask);
    setPendingTask(result.data.pendingTask);
  });

  axiosPublic.get(`/submissions/buyer/${user.email}`).then((res) => {
    setSubmissions(res.data);
  });
  // console.log(submissions);

  const handleApproved = (id) => {
    Swal.fire({
      title: "Do you really want to approve the submission?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Submission Approved!", "", "success");
        axiosPublic.patch(`/submissions/approved/${id}`).then((result) => {
          console.log(result.data);
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleRejected = (id) => {
    Swal.fire({
      title: "Do you really want to reject the submission?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Submission Rejected!", "", "success");
        axiosPublic.patch(`/submissions/rejected/${id}`).then((result) => {
          console.log(result.data);
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between font-semibold text-lg xl:text-2xl">
        <p>Total Task: {totalTask}</p>
        <p>Pending Task: {pendingTask}</p>
        <p>Total Payment: 0</p>
      </div>
      <div>
        <h2 className="text-3xl font-semibold mt-12">Review</h2>
        <div className="mt-6">
          <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="text-lg font-semibold">
                  <th>#</th>
                  <th>Worker's Name</th>
                  <th>Task Title</th>
                  <th className="text-center">Payable Amount</th>
                  <th className="text-center">Submission Details</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {submissions.map((submission, idx) => (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td>{submission.name}</td>
                    <td>{submission.title}</td>
                    <td className="text-center">{submission.payableAmount}</td>
                    <td className="text-center">
                      <button
                        onClick={() => openModal(submission)}
                        className="btn bg-base-300"
                      >
                        View Submission Details
                      </button>
                    </td>
                    <td>
                      <div className="join join-vertical">
                        <button
                          onClick={() => {
                            handleApproved(submission._id);
                          }}
                          className="btn join-item bg-base-300"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            handleRejected(submission._id);
                          }}
                          className="btn join-item bg-base-300"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-lg font-bold mb-4">{modalInfo.title}</h2>
              <p className="mb-6">{modalInfo.details}</p>
              <h2 className="text-lg font-semibold mt-4">Submission Details</h2>
              <p>{modalInfo.submissionDetails}</p>
              <h2 className="text-lg font-semibold mt-4">Worker Information</h2>
              <p>
                <span className="font-semibold">Name: </span>{modalInfo.name}
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                {modalInfo.workerEmail}
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <button className="btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
