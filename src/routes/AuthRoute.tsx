/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet } from "react-router-dom"
import getStore from "../store"

const AuthRoute = () => {
  const { auth } = getStore((store) => store)
  return auth?.accessToken ? <Outlet /> : <Navigate to={"/login"} />
}

export default AuthRoute
