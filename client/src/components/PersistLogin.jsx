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
    console.log('attempting to refresh')

    useEffect(() => {
        let isMounted = true

        async function verifyRefreshToken () {
            try {
                const response = await refresh()
                console.log('this is the response in PeresistLogin.jsx')
                console.log(response)
            } catch (err) {
                console.error(err)
            } finally {
                isMounted && setIsLoading(false)
            }
        }
    
        !currentToken && trustLocalComputer ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false
    }, [])

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
