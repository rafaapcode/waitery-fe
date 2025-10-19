import { Sidebar } from "lucide-react";
import { Outlet } from "react-router-dom";
import { UserRole } from "../../app/entities/User";
import { useAuth } from "../../app/hooks/useAuth";
import Unpermissionless from "../../components/Unpermissionless";
// import NotFoundOrgPage from "../pages/org/notFoundOrg/NotFoundOrg";
// import NotFoundOrg from "@/view/pages/org/notFoundOrg/NotFoundOrg";
// import NotFoundOrg from "../components/NotFoundOrg";
// import UnpermissionlessPage from "../components/Unpermissionless";
// import Sidebar from "../components/sidebar/Sidebar";

function Layout() {
  const { user } = useAuth();

  if(!user) {
    return null;
  }

  const role = user.role;

  return (
    <main className="bg-[#FAFAFA] w-full flex h-screen">
        {(role === UserRole.OWNER || role === UserRole.ADMIN) && <Sidebar />}
        <section className="w-full h-full">
          {(role === UserRole.WAITER || role === UserRole.CLIENT) && <Unpermissionless />}
          {/* {!user.org.id && <NotFoundOrgPage />} */}
          {/*
        {!user.orgId && <NotFoundOrg />}
        {user.orgId && <Outlet />} */}
          <Outlet />
        </section>
      </main>
  );
}

export default Layout;
