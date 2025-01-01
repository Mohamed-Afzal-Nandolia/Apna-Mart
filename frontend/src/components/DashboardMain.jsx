import propTypes from "prop-types"
import { Products } from "./Products"
import { AddProduct } from "./AddProduct"
import { SetMinimumOrder } from "./SetMinimumOrder"

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
    else if(searchParams === "set-minimum-order"){
      return (
        <SetMinimumOrder />
      )
    }
  }
}



DashboardMain.propTypes = {
    searchParams: propTypes.string
}