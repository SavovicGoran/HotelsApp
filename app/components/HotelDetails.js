import React, { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { HeartIcon, HeartFillIcon } from "@primer/octicons-react"
import StateContext from "../StateContext"
import Axios from "axios"
import { baseUrl } from "./api"

function HotelDetails(props) {
  let { hotelId } = useParams()
  const appState = useContext(StateContext)
  const [details, setDetails] = useState({})
  const token = "Token " + appState.user.token

  useEffect(() => {
    Axios.get(`${baseUrl}/hotel_api/${hotelId}`, { headers: { Authorization: token } }).then((res) => {
      setDetails(res.data)
    })
  }, [])

  async function addToFavourites() {
    await Axios.post(baseUrl + "/favorites/add_remove/", {
      headers: { Authorization: token },
      body: { hotel_id: props.hotelId, is_favorite: false },
    })
  }

  return (
    <div>
      {hotelId == details.id && (
        <div className="card">
          <img style={{ width: "600px" }} className="card-img-top" src={details.image} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{details.name} </h5>
            <p onClick={addToFavourites}>
              add to favorites <HeartIcon size={24} />
            </p>

            {/* <HeartFillIcon size={24} /> */}
            <p className="card-text">{details.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Country: {details.country}</li>
            <li className="list-group-item">City: {details.city}</li>
            <li className="list-group-item">Price per night: {details.price}$</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default HotelDetails
