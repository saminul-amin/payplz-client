import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

export default function MyTasks() {
  const { user } = useAuth();
//   const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { data: tasks = [], isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks/${user.email}`);
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;
//   const userEmail = user.email;
//   const currentUser = users.filter((usr) => usr.email === userEmail)[0];
  // console.log(currentUser);

//   axiosPublic.get(`/tasks/${user.email}`).then((res) => {
//     setTasks(res.data);
//   });
console.log(tasks);

  const handleDeleteTask = (task) => {
    const reqWorkers = parseInt(task.workers);
    const amountEach = parseFloat(task.payableAmount);
    const totalPrice = reqWorkers * amountEach;
    // console.log(totalPrice);

    Swal.fire({
      title: "Do you really want to delete it?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/tasks/${task._id}`).then((result) => {
        //   console.log(result.data.deletedCount);
          if (result.data.deletedCount > 0) {
            handleUpdateCoin(user.email, totalPrice);
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

  const handleUpdateCoin = async (email, coin) => {
    const res = await axiosPublic.post("/update-coin", {
      email: email,
      coin: parseInt(coin),
    });
    console.log(res);
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold">My Tasks</h2>
      <div className="mt-6">
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-lg font-semibold">
                <th>#</th>
                <th>Task Title</th>
                <th className="text-center">Task Details</th>
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
                  <td className="text-center">{task.workers}</td>
                  <td className="text-center">{task.payableAmount}</td>
                  <td>
                    <div className="join join-vertical">
                      <Link to="/dashboard/update-task" state={{ task: task }}>
                        <button className="btn join-item text-xl bg-base-300">
                          <CiEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteTask(task)}
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
