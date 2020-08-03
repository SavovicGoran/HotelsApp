import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../DispatchContext"

function HeaderLoggedIn(props) {
  const appDispatch = useContext(DispatchContext)
  function handleLogout() {
    //dispatch action logout
    appDispatch({ type: "logout" })
    appDispatch({ type: "flashMessage", value: "You have successfully logged out" })
  }
  return (
    <div className="flex-row my-3 my-md-0">
      <Link to="/favourites" className="btn btn-sm btn-light mr-2">
        Favourites
      </Link>
      <Link to="/" className="btn btn-sm btn-light mr-2">
        Dashboard
      </Link>
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  )
}

export default HeaderLoggedIn
