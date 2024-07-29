import propTypes from "prop-types"
import { Products } from "./Products"

export const DashboardMain = ({searchParams}) => {
  {
    if (searchParams === "Products") {
      return (
        <Products />
      )
    }
  }
}



DashboardMain.propTypes = {
    searchParams: propTypes.string
}