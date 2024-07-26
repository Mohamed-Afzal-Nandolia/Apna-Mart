import propTypes from "prop-types"

export const DashboardMain = ({searchParams}) => {
  return (
    <div>
        {searchParams}
    </div>
  )
}

DashboardMain.propTypes = {
    searchParams: propTypes.object
}