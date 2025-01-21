import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

export default function BuyerHome() {
  const { user } = useAuth();
  const [totalTask, setTotalTask] = useState(0);
  const [pendingTask, setPendingTask] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { data: taskCount = [], isLoading } = useQuery({
    queryKey: ["taskCount"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tasks/worker");
      return res.data;
    },
  });
  const {
    data: submissions = [],
    isLoading: isSubmissionsLoading,
    refetch,
  } = useQuery({
    queryKey: ["submissions", user.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/submissions/buyer/${user.email}`);
      return res.data;
    },
    enabled: !!user.email,
  });
  
  
  const pendingSubmissions = submissions.filter(
    (submission) => submission.status === "pending"
  );

  useEffect(() => {
    if (taskCount?.totalTask !== undefined) {
      setTotalTask(taskCount.totalTask);
    }
    if (taskCount?.pendingTask !== undefined) {
      setPendingTask(taskCount.pendingTask);
    }
  }, [taskCount]);

  if (isLoading || isSubmissionsLoading) {
    return <p>Loading...</p>;
  }

  const openModal = (data) => {
    setIsModalOpen(true);
    setModalInfo(data);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalInfo([]);
  };

  // axiosPublic.get("/tasks/worker").then((result) => {
  //   setTotalTask(result.data.totalTask);
  //   setPendingTask(result.data.pendingTask);
  // });

  // axiosPublic.get(`/submissions/buyer/${user.email}`).then((res) => {
  //   setSubmissions(res.data);
  // });
  // console.log(submissions);

  const handleApproved = (id, workerEmail, coinAmount) => {
    handleUpdateCoin(workerEmail, coinAmount);
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
        refetch();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleRejected = (id, taskId) => {
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
        axiosPublic.post(`/tasks/increase-worker/${taskId}`).then((result) => {
          console.log(result.data);
        });
        refetch();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleUpdateCoin = async (workerEmail, coin) => {
    const res = await axiosPublic.post("/update-coin", {
      email: workerEmail,
      coin: parseInt(coin),
    });
    console.log(res);
  }

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
                {pendingSubmissions.map((submission, idx) => (
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
                            handleApproved(
                              submission._id,
                              submission.workerEmail,
                              submission.payableAmount,
                            );
                          }}
                          className="btn join-item bg-base-300"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            handleRejected(submission._id, submission.taskId);
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
                <span className="font-semibold">Name: </span>
                {modalInfo.name}
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
