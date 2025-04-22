import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../pages/Login"

import Template from "../pages/_template"

// dashboard pages
import DashboardPage from "../pages/DashboardPage"

// # Models
import ModelsPage from "../pages/Models"
import ModelForm from "../pages/FormsPages/Model"

// # Products
import ProductsPage from "../pages/Products"
import ProductForm from "../pages/FormsPages/Product"

// # Clients
import ClientsPage from "../pages/Clients"
import ClientsForm from "../pages/FormsPages/Clients"

// # Orders
import OrdersPage from "../pages/Orders"
import OrdersForm from "../pages/FormsPages/Orders"

// # Manufacturing
import ProductionLinesPage from "../pages/ProductionLines"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* <Route path="/" element={<AuthRoute />}> */}
        <Route path="dashboard" element={<Template />}>
          <Route path="" element={<DashboardPage />} />
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
          <Route path="clients">
            <Route path={""} element={<ClientsPage />} />
            <Route path="single">
              <Route path={""} element={<ClientsForm />} />
              <Route path={":id"} element={<ClientsForm />} />
            </Route>
          </Route>
          <Route path="orders">
            <Route path={""} element={<OrdersPage />} />
            <Route path="single">
              <Route path={""} element={<OrdersForm />} />
              <Route path={":id"} element={<OrdersForm />} />
            </Route>
          </Route>
          <Route path="production" element={<ProductionLinesPage />} />
        </Route>

        {/* sys routes */}
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route path="*" element={<Navigate to={"/dashboard"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
