import { useForm } from "react-hook-form";
import { Link, redirect } from "react-router-dom";
import { registerAdmin } from "../services/AuthService";

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // await new Promise((resolve) => {setTimeout(resolve, 5000)})
    
    registerAdmin(data).then((response) => {
      console.log(response.data);
      localStorage.setItem("Authorization", "Bearer " + response.data.jwtToken);
      redirect('/admin/login')
    }).catch(error => {
      console.error(error);
    })

    console.log(data)
  }

  return (
    <form className="h-screen w-screen flex flex-col justify-center place-items-center" onSubmit={handleSubmit(onSubmit)}>
      <div className="p-10 flex flex-col gap-6 bg-white rounded-xl">
        <h1 className="font-bold text-slate-950 text-center text-3xl sm:text-4xl md:text-5xl">Admin Signup</h1>
        <h3 className="text-slate-950 text-sm sm:text-base text-center">Already have an account? <Link to="/admin/signin" className="underline pl-1">Login</Link></h3>
        <div className="flex flex-col sm:gap-2 gap-1 text-sm sm:text-base">
          <label className="font-semibold text-slate-950" htmlFor="email">Email: </label>
          <input className="px-5 py-2 rounded-md border shadow-sm" name="email" type="email" placeholder="example@gmail.com" {...register("a_email")}/>
          {errors.email && <div className="text-red-500">{errors.email.message}</div>}
        </div>
        <div className="flex flex-col sm:gap-2 gap-1 text-sm sm:text-base">
          <label className="font-semibold text-slate-950" htmlFor="email">Username: </label>
          <input className="px-5 py-2 rounded-md border shadow-sm" name="username" type="text" placeholder="username" {...register("a_name")}/>
          {errors.username && <div className="text-red-500">{errors.username.message}</div>}
        </div>
        <div className="flex flex-col sm:gap-2 gap-1 text-sm sm:text-base">
          <label className="font-semibold text-slate-950" htmlFor="email">Password: </label>
          <input className="px-5 py-2 rounded-md border shadow-sm" name="password" type="password" placeholder="Password" {...register("a_pass")}/>
          {errors.password && <div className="text-red-500">{errors.password.message}</div>}
        </div>
        {/* <div className="flex flex-col sm:gap-2 gap-1 text-sm sm:text-base">
          <label className="font-semibold text-slate-950" htmlFor="email">Confirm Password: </label>
          <input className="px-5 py-2 rounded-md border shadow-sm" name="confirm-password" type="password" placeholder="Confirm Password" {...register("confirm-password")}/>
          {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword.message}</div>}
        </div> */}
        <button className="bg-slate-950 shadow-md text-white px-3 py-2 rounded-lg text-base hover:bg-slate-950 ease-in duration-300 hover:scale-105 mt-4" type="submit">
          {
            isSubmitting ?
            "Loading..." :
            "Submit" 
          }
        </button>
        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      </div>
    </form>
  );
};
