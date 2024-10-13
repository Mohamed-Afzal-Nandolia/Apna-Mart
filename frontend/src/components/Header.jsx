import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/loginCheck";
import { ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";
import logo from "../assets/apnamart.jpg";

export const Header = ({ toggleCart, cartItemsCount }) => {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  return (
    <div className="border-b border-gray-200 text-primary-foreground py-4 text-white flex justify-between items-center px-12">
      {/* <div className="text-2xl font-bold">APNA MART</div> */}
      <img src={logo} alt="APNA MART" className="w-52 h-auto" />
      <div className="flex items-center gap-8">
        {!loggedIn && (
          <Button
            color="light"
            className="text-sm py-0 rounded-md text-main-blue"
            onClick={() => navigate("/user/login")}
          >
            Signin
          </Button>
        )}
        <div className="relative">
          <ShoppingCart color="indigo" onClick={toggleCart} className="cursor-pointer w-12 h-8"/>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2">
            {cartItemsCount > 0 && cartItemsCount}
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  toggleCart: PropTypes.func.isRequired,
  cartItemsCount: PropTypes.number.isRequired,
}
