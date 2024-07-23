import Template from "../pages/_template"
import { Navigate, Outlet } from "react-router-dom"
// import getStore from "../store"

const AuthRoute = () => {
  let devRet = true
  // const { auth, controllers } = getStore((store) => store)

  // if (auth.token === null) {
  //   controllers.auth.removeToken()
  //   controllers.comp.unselectData()
  //   controllers.companies.cleanList()
  //   controllers.user.singOut()
  // }

  // return auth.token !== null ? (
  return devRet ? <Outlet /> : <Navigate to={"/login"} />
}

export default AuthRoute
