import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../pages/Login"

import Template from "../pages/_template"

// dashboard pages
import ProductsPage from "../pages/Products"
import ProductForm from "../pages/ProductForm"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* <Route path="/" element={<AuthRoute />}> */}
        <Route path="dashboard" element={<Template />}>
          <Route path="products">
            <Route path={""} element={<ProductsPage />} />
            <Route path={"single"} element={<ProductForm />} />
            <Route path="single">
              <Route path={""} element={<ProductForm />} />
              <Route path={":id"} element={<ProductForm />} />
            </Route>
          </Route>
          <Route path="clients" element={<></>} />
          <Route path="orders" element={<></>} />
          <Route path="manufacturing" element={<></>} />
        </Route>

        {/* sys routes */}
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route path="*" element={<Navigate to={"/dashboard"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
