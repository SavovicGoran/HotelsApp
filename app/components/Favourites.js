import React, { useEffect, useState, useContext } from "react"
import StateContext from "../StateContext"
import Axios from "axios"

function Favourites() {
  const appState = useContext(StateContext)
  const [favourites, setFavourites] = useState([])
  const token = "Token " + appState.user.token

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/favorites/", { headers: { Authorization: token } }).then((res) => {
      setFavourites(res.data)
    })
  }, [])
  return (
    <div>
      <h1>This is a list of your favorite hotels</h1>
      <h3>The list is not available at the moment.</h3>
      {/* {favourites.map((favourite, id) => {
        return <div key={id} className="card"></div>
      })} */}
    </div>
  )
}

export default Favourites
