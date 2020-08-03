import React, { useEffect, useState, useContext } from "react"
import StateContext from "../StateContext"
import Axios from "axios"

function HotelReview({ hotelId }) {
  const appState = useContext(StateContext)
  const [reviews, setReviews] = useState([])
  const token = "Token " + appState.user.token

  async function getReviews() {
    try {
      const res = await Axios.get(`http://127.0.0.1:8000/hotel_api/get_hotel_reviews/${hotelId}`, { headers: { Authorization: token } })

      setReviews(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button onClick={getReviews} href="#" className="btn btn-primary">
        Show Reviews
      </button>
      {reviews.map((review, id) => {
        let date = new Date(review.created_at)
        return (
          <div key={id} className="card">
            <div className="card-header">
              {review.author.first_name} {review.author.last_name}
            </div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>{review.message}</p>
                <footer className="blockquote-footer">
                  Date:{" "}
                  <cite title="Source Title">
                    {date.getDay()}/{date.getMonth()}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}:mm
                  </cite>
                </footer>
              </blockquote>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HotelReview
