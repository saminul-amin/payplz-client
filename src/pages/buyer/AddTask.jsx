import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function AddTask() {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    const reqWorkers = parseInt(data.workers);
    const amountEach = parseFloat(data.payableAmount);
    const totalPrice = reqWorkers * amountEach;
    console.log(totalPrice);

    const newTask = data;
    axiosPublic.post("/tasks", newTask).then((result) => {
      //   console.log(result.data);
      if (result.data.insertedId) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New Task Has Been Added",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Add New Task | PayPlz</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center">
        <div className="card bg-base-200 w-full max-w-4xl shrink-0 rounded-2xl py-10 pt-10 pb-4">
          <h2 className="text-2xl font-semibold text-center">
            Fill Up The Form to Add New Task
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
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-neutral font-semibold text-lg text-white rounded-md">
                Add New Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
