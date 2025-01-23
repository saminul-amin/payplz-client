import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Swal from "sweetalert2";

export default function WithdrawalForm() {
  const { user } = useAuth();
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  // const withdrawAmountRef = useRef();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newWithdrawal = {
      email: user.email,
      name: user.displayName,
      withdrawalCoin: parseInt(data.coinToWithdraw),
      withdrawalAmount: withdrawAmount,
      paymentSystem: data.system,
      account: data.account,
      status: "pending",
    };
    // console.log(newWithdrawal);
    axiosSecure.post("/withdrawals", newWithdrawal).then((result) => {
      console.log(result.data);
      if (result.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Withdrawal Request has benn submitted",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/withdrawals");
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Withdrawal Form | PayPlz</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center">
        <div className="card bg-base-200 w-full max-w-4xl shrink-0 rounded-2xl py-10 pt-10 pb-4">
          <h2 className="text-2xl font-semibold text-center">
            Fill Up The Form to Withdraw
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Coin to Withdraw</span>
              </label>
              <input
                type="number"
                {...register("coinToWithdraw", {
                  required: true,
                  onChange: (e) => setWithdrawAmount(e.target.value / 20),
                })}
                placeholder="Enter the Title of the Task"
                className="input input-bordered"
              />
              {errors.coinToWithdraw && (
                <span className="text-red-500">Coin Amount is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Withdraw Amount (in USD)</span>
              </label>
              <input
                type="number"
                {...register("withdrawAmount")}
                placeholder="Enter Details about the Task"
                className="input input-bordered"
                readOnly
                value={withdrawAmount}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Payment System</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("system", { required: true })}
                defaultValue="bkash"
              >
                <option disabled value="bkash">
                  Bkash
                </option>
                <option value="nagad">Nagad</option>
                <option value="rocket">Rocket</option>
              </select>
              {errors.system && (
                <span className="text-red-500">Payment System is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Account Number</span>
              </label>
              <input
                type="number"
                {...register("account", { required: true })}
                placeholder="Enter the Amount that will you pay each worker"
                className="input input-bordered"
              />
              {errors.account && (
                <span className="text-red-500">Account Number is required</span>
              )}
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-neutral font-semibold text-lg text-white rounded-md">
                Withdraw
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
