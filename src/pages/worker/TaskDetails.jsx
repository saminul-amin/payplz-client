import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function TaskDetails() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const task = location.state.task;
  //   console.log(task);

  const onSubmit = (data) => {
    // console.log(data);
    const details = {
      ...task,
      ...data,
      taskId: task._id,
      workerEmail: user.email,
      name: user.displayName,
      status: "pending",
    };
    const { _id, ...submissionDetails } = details;
    // console.log(submissionDetails);
    axiosSecure.post("/submissions", submissionDetails).then((result) => {
      //   console.log(result.data);
      if (result.data.insertedId) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Submission Details has been Submitted",
          showConfirmButton: false,
          timer: 1500,
        });
        axiosSecure
          .post(`/tasks/decrease-worker/${submissionDetails.taskId}`)
          .then((result) => {
            console.log(result.data);
          });
        navigate("/dashboard/task-list");
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Task Details | PayPlz</title>
      </Helmet>
      <h2 className="text-3xl font-semibold">Task Details</h2>
      <div className="mt-6 space-y-3">
        <h3 className="font-semibold text-2xl">Task Title: {task.title}</h3>
        <p className="text-lg">
          <span className="font-semibold">Task Details:</span> {task.details}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Required Workers:</span>{" "}
          {task.workers}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Payable Amount (in USD):</span>{" "}
          {task.payableAmount}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Completion Date:</span> {task.date}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Submission Info:</span> {task.info}
        </p>
      </div>
      <h2 className="text-3xl font-semibold mt-16 mb-4">Submission Form</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-2/3">
            <label className="label">
              <span className="label-text">Submission Description</span>
            </label>
            <textarea
              type="text"
              {...register("submissionDetails", { required: true })}
              placeholder="Enter Submission Details"
              className="textarea textarea-bordered"
            />
            {errors.title && (
              <span className="text-red-500">
                Submission Description is required
              </span>
            )}
          </div>
          <div className="mt-4">
            <button className="btn" disabled={task.workers === 0}>
              Submit
            </button>
            {task.workers === 0 ? (
              <span className="text-red-500">
                {" "}
                (Sorry! This Task is no longer available to submit!)
              </span>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
