import propTypes from "prop-types"
import { Products } from "./Products"
import { AddProduct } from "./AddProduct"
import { SetMinimumOrder } from "./SetMinimumOrder"
import { AllOrders } from "./AllOrders"
import { CreateCategory } from "./CreateCategory"
import { CreateSubCategory } from "./CreateSubCategory"

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
    else if(searchParams === "create-category"){
      return (
        <CreateCategory />
      )
    }
    else if(searchParams === "create-sub-category"){
      return (
        <CreateSubCategory/>
      )
    }
  }
}



DashboardMain.propTypes = {
    searchParams: propTypes.string
}