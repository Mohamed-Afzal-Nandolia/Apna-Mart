import propTypes from "prop-types"
import { Products } from "./Products"
import { AddProduct } from "./AddProduct"

export const DashboardMain = ({searchParams}) => {
  {
    if (searchParams === "products") {
      return (
        <Products />
      )
    } else if (searchParams === "add-product") {
      return (
        <AddProduct />
      )
    }
  }
}



DashboardMain.propTypes = {
    searchParams: propTypes.string
}