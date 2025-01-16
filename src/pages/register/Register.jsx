import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const user = result.user;
      console.log(user);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          navigate("/");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your account has been created",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const handleGoogleSignIn = () => {
    userGoogleSignIn().then((result) => {
      console.log(result.user);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your account has been created",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <div>
      <Helmet>
        <title>Register | PayPlz</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center">
        <div className="card bg-base-200 w-full max-w-lg shrink-0 rounded-2xl py-10 pt-10 pb-4">
          <h2 className="text-2xl font-semibold text-center">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                {...register("name", { required: true })}
                name="name"
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="Photo URL"
                className="input input-bordered"
              />
              {errors.photoURL && (
                <span className="text-red-500">Photo URL is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                placeholder="Email"
                className="input input-bordered"
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
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500">Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500">
                  Password MUST BE 6 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-500">
                  Password MUST BE less than 20 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500">
                  Password MUST have one upper case, one lower case, one number
                  and one special character
                </span>
              )}
            </div>
            <div>
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("role", { required: true })}
              >
                <option disabled selected>
                  What's Your Role
                </option>
                <option value="worker">Worker</option>
                <option value="buyer">Buyer</option>
              </select>
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
              Create Account With Google
            </button>
          </div>
          <p className="text-center font-semibold">
            Already Have An Account? &nbsp;
            <Link className="text-red-500" to="/signin">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
