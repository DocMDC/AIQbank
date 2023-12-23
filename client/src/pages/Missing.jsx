import React from 'react'
import { Link } from "react-router-dom"

export default function Missing() {
  return (
    <>
      <div>Page not found</div>
      <Link to="/" className="mr-auto hover:text-front-600">
          <h1>Return to home page</h1>
      </Link>
    </>
  )
}
