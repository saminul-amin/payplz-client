import { useState } from "react";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

export default function ManageTasks() {
  // const [tasks, setTasks] = useState([]);
  const axiosSecure = useAxiosSecure();
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks");
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;
  console.log(tasks);

  // axiosSecure.get("/tasks").then((res) => {
  //   setTasks(res.data);
  // });

  const handleDeleteTask = (id) => {
    Swal.fire({
      title: "Do you really want to delete it?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tasks/${id}`).then((result) => {
          if (result.data.deletedCount > 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Task Has Been Deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Task Not Deleted!", "", "info");
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Manage Tasks | PayPlz</title>
      </Helmet>
      <h2 className="text-3xl font-semibold">Manage Tasks</h2>
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
                <th>Required Workers</th>
                <th>Payable Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {tasks.map((task, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{task.title}</td>
                  <td>{task.details}</td>
                  <td>{task?.email}</td>
                  <td className="text-center">{task.workers}</td>
                  <td className="text-center">{task.payableAmount}</td>
                  <td>
                    <div>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="btn join-item text-xl bg-base-300"
                      >
                        <MdDelete />
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
  );
}
