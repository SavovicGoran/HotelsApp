import React, { useEffect, useContext, useState } from "react"
import Page from "./Page"
import StateContext from "../StateContext"
import Axios from "axios"
import HotelReview from "./Hotelreview"
import { Link } from "react-router-dom"

function Home() {
  const appState = useContext(StateContext)
  const [allhotels, setAllhotels] = useState([])
  const token = "Token " + appState.user.token

  async function getAllHotels() {
    try {
      const res = await Axios.get("http://127.0.0.1:8000/hotel_api/", { headers: { Authorization: token } })

      setAllhotels(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Page title="Your feed">
        <h2 className="text-center">
          Hello <strong>{appState.user.username}</strong>
        </h2>
        <h3 className="text-center">Wellcome to your dashboard</h3>

        <button className="btn btn-md btn-dark btn-block" onClick={getAllHotels}>
          Load All Hotels
        </button>
        <hr />
        {allhotels.map((hotel, id) => {
          return (
            <div className="card" key={id}>
              <img className="card-img-top" src={hotel.image} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">
                  {hotel.name} {hotel.stars}
                  <strong>{" stars"}</strong>
                  <Link to={`/hotel-details/${hotel.id}`}>
                    <p className="font-italic">Hotel details</p>
                  </Link>
                </h5>
                <p className="card-text">{hotel.description}</p>

                <HotelReview hotelId={hotel.id} />
              </div>
            </div>
          )
        })}
      </Page>
    </div>
  )
}

export default Home
