import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../view/layout/Layout";
import Home from "../view/page/home";
import LoginPage from "../view/page/login";
import NotFoundPage from "../view/page/notFound";
import RegisterPage from "../view/page/register";
import AuthGuard from "./AuthGuard";
// import { Layout } from "lucide-react";

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
            <Route path="/historico" element={<p>historico !</p>} />
            <Route path="/cardapio" element={<p>Cardapio !</p>} />
            <Route path="/usuarios" element={<p>Usuarios !</p>} />
            <Route path="/profile" element={<p>Profile !</p>} />
            <Route path="/org" element={<p>Orgs !</p>} />
          </Route>
          {/* <Route path="/org/register" element={<p>Registrar Org</p>} /> */}
        </Route>
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
