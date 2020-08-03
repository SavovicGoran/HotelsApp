import React, { useState, useContext } from "react"
import Page from "./Page"
import Axios from "axios"
import DispatchContext from "../DispatchContext"
import { baseUrl } from "./api"

function HomeGuest() {
  const appDispatch = useContext(DispatchContext)
  const [username, setUsername] = useState("")
  const [first_name, setFirstname] = useState("")
  const [last_name, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await Axios.post(baseUrl + "/register/", { username, first_name, last_name, email, password })

      appDispatch({ type: "flashMessage", value: "You have successfully register" })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Page title="Welcome!" wide={true}>
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <h1 className="display-3">HotelsApp</h1>
          <p className="lead text-muted">Wellcome to the best app for hotels!</p>
        </div>
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Username</small>
              </label>
              <input onChange={(e) => setUsername(e.target.value)} id="username-register" name="username" required className="form-control" type="text" placeholder="Pick a username" autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="firstname-register" className="text-muted mb-1">
                <small>First name</small>
              </label>
              <input onChange={(e) => setFirstname(e.target.value)} id="firstname-register" name="firstname" required className="form-control" type="text" placeholder="Type in your first name" autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="lastname-register" className="text-muted mb-1">
                <small>Last name</small>
              </label>
              <input onChange={(e) => setLastname(e.target.value)} id="lastname-register" name="lastname" required className="form-control" type="text" placeholder="Type in your last name" autoComplete="off" />
            </div>

            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input onChange={(e) => setEmail(e.target.value)} id="email-register" name="email" required className="form-control" type="email" placeholder="you@example.com" autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input onChange={(e) => setPassword(e.target.value)} id="password-register" name="password" required className="form-control" type="password" placeholder="Create a password" />
            </div>
            <button type="submit" className="py-3 mt-4 btn btn-lg btn-secondary btn-block">
              Sign up for HotelsApp
            </button>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default HomeGuest
