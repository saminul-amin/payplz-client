import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const { userGoogleSignIn, userSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log(data);
    userSignIn(data.email, data.password).then((result) => {
      console.log(result.user);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You are Logged In",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      navigate(from, { replace: true });
    });
  };

  const handleGoogleSignIn = () => {
    userGoogleSignIn().then((result) => {
      console.log(result.user);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You are Logged In",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };

  return (
    <div>
      <Helmet>
        <title>Login | PayPlz</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center">
        <div className="card bg-base-200 w-full max-w-lg shrink-0 rounded-2xl py-10 pt-10 pb-4">
          <h2 className="text-2xl font-semibold text-center">
            Login your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
              <label className="label">
                <Link className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-neutral font-semibold text-lg text-white rounded-md">
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-2 mb-4 mx-8">
            <button
              onClick={handleGoogleSignIn}
              className="w-full btn btn-neutral font-semibold text-lg text-white rounded-md"
            >
              <FcGoogle />
              Sign In With Google
            </button>
          </div>
          <p className="text-center font-semibold">
            Dont't Have An Account? &nbsp;
            <Link className="text-red-500" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
