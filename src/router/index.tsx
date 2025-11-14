import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../view/layout/Layout";
import History from "../view/page/history";
import Home from "../view/page/home";
import LoginPage from "../view/page/login";
import Menu from "../view/page/menu";
import NotFoundPage from "../view/page/notFound";
import Org from "../view/page/org";
import RegisterPage from "../view/page/register";
import Users from "../view/page/users";
import AuthGuard from "./AuthGuard";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false}/>}>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Route>
        <Route element={<AuthGuard isPrivate/>}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/historico" element={<History />} />
            <Route path="/cardapio" element={<Menu />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/profile" element={<p>Profile !</p>} />
            <Route path="/org" element={<Org />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
