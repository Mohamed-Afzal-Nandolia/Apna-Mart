import propTypes from "prop-types"
import { Products } from "./Products"
import { AddProduct } from "./AddProduct"
import { SetMinimumOrder } from "./SetMinimumOrder"
import { CreateCategory } from "./CreateCategory"
import { CreateSubCategory } from "./CreateSubCategory"
import { AllCategories } from "./AllCategories"
import { DeleteCategory } from "./DeleteCategory"

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
    else if(searchParams === "all-category"){
      return (
        <AllCategories/>
      )
    }
    else if(searchParams === "delete-category"){
      return (
        <DeleteCategory/>
      )
    }
  }
}



DashboardMain.propTypes = {
    searchParams: propTypes.string
}