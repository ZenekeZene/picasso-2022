import { useRoutes } from "react-router-dom"
import Home, { path as homePath } from "ui/pages/home/Home"
import About, { path as aboutPath } from "ui/pages/about/About"

const Router = () => {
  const routes = useRoutes([
    { path: homePath, element: <Home /> },
    { path: aboutPath, element: <About /> },
  ])
  return routes
}

export default Router
