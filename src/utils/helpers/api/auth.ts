import { Api } from "../../../api"
import store from "../../../store"

export const login = async (email: string, password: string) => {
  const req = await Api.auth.login({ email, password })

  if (req.ok) {
    const data = req.data

    localStorage.setItem("accessToken", data.accessToken)
    localStorage.setItem("refreshToken", data.refreshToken)
  }
}

export const logout = () => {
  const storeState = store.getState()

  const { controllers } = storeState

  controllers.auth.clear()
  controllers.user.clear()

  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}
