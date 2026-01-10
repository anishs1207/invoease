import { Route } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import {About, Admin, Register, Login, NotFound, VerifyCode, Home, Contact, Invoice, Payment, Subscription} from "./pages"

import './index.css';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="verify-code" element={<VerifyCode />} />
      <Route path="*" element={<NotFound />} />
      <Route path="invoice" element={<Invoice />} />
      <Route path="payment" element={<Payment />} />
      <Route path="history" element={<Subscription />} />
      <Route path="admin" element={<Admin />} />
    </Route>

  )
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
