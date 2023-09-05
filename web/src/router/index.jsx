import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../pages/Layout/"
import Home from "../pages/Home"
import NoPage from "../pages/NoPage"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
