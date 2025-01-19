import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateTask() {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const task = location.state.task;
  // console.log(task);

  const onSubmit = (data) => {
    // console.log(data);
    const newTask = data;
    axiosPublic.patch(`/tasks/${task._id}`, newTask).then((result) => {
      console.log(result.data);
      if (result.data.modifiedCount) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Task Has Been Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/my-tasks");
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Update Task | PayPlz</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center">
        <div className="card bg-base-200 w-full max-w-4xl shrink-0 rounded-2xl py-10 pt-10 pb-4">
          <h2 className="text-2xl font-semibold text-center">
            Fill Up The Form to Update The Task
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Task Title</span>
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="Enter the Title of the Task"
                className="input input-bordered"
                defaultValue={task.title}
              />
              {errors.title && (
                <span className="text-red-500">Task Title is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Task Detail</span>
              </label>
              <input
                type="text"
                {...register("details", { required: true })}
                placeholder="Enter Details about the Task"
                className="input input-bordered"
                defaultValue={task.details}
              />
              {errors.details && (
                <span className="text-red-500">Task Details is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Required Workers</span>
              </label>
              <input
                type="number"
                {...register("workers", { required: true })}
                placeholder="Enter the number of required Workers"
                className="input input-bordered"
                defaultValue={task.workers}
                readOnly
              />
              {errors.workers && (
                <span className="text-red-500">
                  Required Workers is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Payable Amount (In USD)</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register("payableAmount", { required: true })}
                placeholder="Enter the Amount that will you pay each worker"
                className="input input-bordered"
                defaultValue={task.payableAmount}
                readOnly
              />
              {errors.payableAmount && (
                <span className="text-red-500">Payable Amount is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Completion Date</span>
              </label>
              <input
                type="date"
                {...register("date", { required: true })}
                placeholder="Enter the Deadline of Completion"
                className="input input-bordered"
                defaultValue={task.date}
                readOnly
              />
              {errors.date && (
                <span className="text-red-500">
                  Completion Date is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Submission Info</span>
              </label>
              <input
                type="text"
                {...register("info", { required: true })}
                placeholder="Enter needed informations for Submission"
                className="input input-bordered"
                defaultValue={task.info}
              />
              {errors.info && (
                <span className="text-red-500">
                  Submission Info is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Task Image URL</span>
              </label>
              <input
                type="url"
                {...register("imageURL")}
                placeholder="Enter Task Image URL"
                className="input input-bordered"
                defaultValue={task.imageURL}
                readOnly
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-neutral font-semibold text-lg text-white rounded-md">
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
