import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerAdmin, registerUser } from "../services/Apis";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';

export const SignupFormAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data, page) => {
    // await new Promise((resolve) => {setTimeout(resolve, 5000)})
    
    if (location.pathname === "/admin/signup") {//page === "admin"
      registerAdmin(data)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem(
            "Authorization",
            "Bearer " + response.data.jwtToken
          );
          navigate("/admin/login");
          toast.success("Registration Successfull!")
          toast.success("Please login to your Account")
        })
        .catch((error) => {
          console.error(error);
          toast.error("Email or Password is wrong!")
        });
    } else {
      registerUser(data)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem(
            "Authorization",
            "Bearer " + response.data.jwtToken
          );
          navigate("/user/login");
        })
    }

    console.log(data);
  };

  return (
    <form
      className="h-screen w-screen flex flex-col justify-center place-items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-10 flex flex-col gap-6 bg-white rounded-xl">
        <h1 className="font-bold text-slate-950 text-center text-3xl sm:text-4xl md:text-5xl">
          Admin Signup
        </h1>
        <h3 className="text-slate-950 text-sm sm:text-base text-center">
          Already have an account?{" "}
          <Link to={"/admin/login"} className="underline pl-1">
            Login
          </Link>
        </h3>
        <div className="flex flex-col sm:gap-2 gap-1 text-sm sm:text-base">
          <label className="font-semibold text-slate-950" htmlFor="email">
            Email:{" "}
          </label>
          <input
            className="px-5 py-2 rounded-md border shadow-sm"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            {...register("a_email")}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="flex flex-col sm:gap-2 gap-1 text-sm sm:text-base">
            <label className="font-semibold text-slate-950" htmlFor="email">
              Username:{" "}
            </label>
            <input
            className="px-5 py-2 rounded-md border shadow-sm"
            name="username"
            type="text"
            placeholder="username"
            {...register("a_name")}
          />
        </div>
        <div className="flex flex-col sm:gap-2 gap-1 text-sm sm:text-base">
          <label className="font-semibold text-slate-950" htmlFor="email">
            Password:{" "}
          </label>
          <input
            className="px-5 py-2 rounded-md border shadow-sm"
            name="password"
            type="password"
            placeholder="Password"
            {...register("a_pass")}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <button
          className="bg-slate-950 shadow-md text-white px-3 py-2 rounded-lg text-base hover:bg-slate-950 ease-in duration-300 hover:scale-105 mt-4"
          type="submit"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </div>
    </form>
  );
};



