import React, { useState, useReducer, useEffect } from "react"
import ReactDOM from "react-dom"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

// My Components
import Header from "./components/Header"
import Home from "./components/Home"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import HomeGuest from "./components/HomeGuest"
import HotelDetails from "./components/HotelDetails"
import FlashMessages from "./components/FlashMessages"
import Favourites from "./components/Favourites"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("appToken")),
    flashMessages: [],
    isError: false,
    user: {
      token: localStorage.getItem("appToken"),
      username: localStorage.getItem("appUsername"),
    },
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        break
      case "logout":
        draft.loggedIn = false
        break
      case "flashMessage":
        draft.flashMessages.push(action.value)
        draft.isError = action.isError
        break
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("appUsername", state.user.username)
      localStorage.setItem("appToken", state.user.token)
    } else {
      localStorage.removeItem("appUsername")
      localStorage.removeItem("appToken")
    }
  }, [state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages isError={state.isError} messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path="/favourites">{state.loggedIn && <Favourites />}</Route>
            <Route path="/hotel-details/:hotelId">{state.loggedIn && <HotelDetails />}</Route>
            <Route path="/about-us">
              <About />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))
