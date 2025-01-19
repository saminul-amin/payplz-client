import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic();

  axiosPublic.get("/tasks").then((res) => {
    setTasks(res.data);
  });

  return (
    <div>
      <h2 className="text-3xl font-semibold">Task List</h2>
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
                      <Link to="/dashboard/task-details" state={{ task: task }}>
                        <button className="btn join-item text-base bg-base-300">
                          Details
                        </button>
                      </Link>
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
