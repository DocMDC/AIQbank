import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom"
import { useRefreshToken } from "../hooks/useRefreshToken"
import { selectCurrentToken, selectPersist } from '../redux/slices/authSlice'
import { useSelector } from "react-redux"


export default function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const currentToken = useSelector(selectCurrentToken)
    const trustLocalComputer = useSelector(selectPersist)

    useEffect(() => {
        let isMounted = true

        async function verifyRefreshToken () {
            try {
                await refresh()
            } catch (err) {
                console.error(err)
            } finally {
                isMounted && setIsLoading(false)
            }
        }
    
        !currentToken && trustLocalComputer ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false
    }, [])
    

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`)
    //     console.log(`token: ${currentToken}`)
    // }, [isLoading])

  return (
    <>
        {!trustLocalComputer
            ? <Outlet/>
            : isLoading
                ? <p>Loading...</p>
                : <Outlet />
        }
    </>
  )
}
