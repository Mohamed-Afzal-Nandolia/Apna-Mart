import { LoginFormAdmin } from "../components/LoginFormAdmin";

export const AdminLogin = () => {
  return (
    <div className="w-full h-screen p-5 flex place-items-center justify-center">
      <LoginFormAdmin page="admin"/>
    </div>
  );
};
