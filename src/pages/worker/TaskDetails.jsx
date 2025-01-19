import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

export default function TaskDetails() {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const task = location.state.task;
  console.log(task);

  const onSubmit = (data) => {
    // console.log(data);
  };

  return (
    <div>
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
              rows={4}
              cols={50}
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter Submission Details"
              className="input input-bordered"
            />
            {errors.title && (
              <span className="text-red-500">
                Submission Description is required
              </span>
            )}
          </div>
          <div className="mt-4">
            <button className="btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
