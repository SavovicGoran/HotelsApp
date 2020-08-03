import React, { useEffect } from "react"

function FlashMessages(props) {
  let danger = props.isError ? "alert-danger" : "alert-success"
  return (
    <div className="floating-alerts">
      {props.messages.map((message, index) => {
        return (
          <div key={index} className={`alert ${danger} text-center floating-alert shadow-sm`}>
            {message}
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessages
