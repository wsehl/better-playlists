import React, { useEffect, useState } from "react"
import { token } from "./api"
import Login from "./pages/Login"
import Home from "./pages/Home"

export default function App() {
  const [accessToken, setAccessToken] = useState("")

  useEffect(() => {
    setAccessToken(token)
  }, [])

  return (
    <>
      <div className="container">{accessToken ? <Home /> : <Login />}</div>
    </>
  )
}
