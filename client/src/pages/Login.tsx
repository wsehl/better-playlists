import React from "react"
import { SERVER_URI } from "../config"

export default function Login() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">
        <button
          className="px-4 py-2 text-center rounded-lg bg-green-500-spotify bg-opacity-90 text-white font-medium focus:outline-none focus:ring-2 ring-green-500-spotify ring-opacity-20 shadow"
          type="button"
          onClick={() => {
            window.location.href = `${SERVER_URI}/login`
          }}
        >
          Sign in with Spotify
        </button>
      </div>
    </div>
  )
}
