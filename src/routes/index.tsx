import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../pages/Login"

import Template from "../pages/_template"

// dashboard pages

// # Models
import ModelsPage from "../pages/Models"
import ModelForm from "../pages/ModelsForm"

// # Products
import ProductsPage from "../pages/Products"
import ProductForm from "../pages/ProductForm"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* <Route path="/" element={<AuthRoute />}> */}
        <Route path="dashboard" element={<Template />}>
          <Route path="models">
            <Route path={""} element={<ModelsPage />} />
            <Route path="single">
              <Route path={""} element={<ModelForm />} />
              <Route path={":id"} element={<ModelForm />} />
            </Route>
          </Route>
          <Route path="products">
            <Route path={""} element={<ProductsPage />} />
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
