import { Outlet } from "react-router-dom";
import { UserRole } from "../../app/entities/User";
import { useAuth } from "../../app/hooks/useAuth";
import Unpermissionless from "../../components/Unpermissionless";
import Sidebar from "./components/sidebar";


function Layout() {
  const { user } = useAuth();

  if(!user) {
    return null;
  }

  const role = user.role;
  return (
    <main className="bg-[#FAFAFA] w-full flex h-screen">
        {(role === UserRole.OWNER || role === UserRole.ADMIN) && <Sidebar />}
        <section className="w-full h-full p-6 overflow-y-auto rounded-tl-4xl rounded-bl-4xl bg-white shadow">
          {(role === UserRole.WAITER || role === UserRole.CLIENT) && <Unpermissionless />}
          {/* {!user.org.id && <NotFoundOrgPage />} */}
          {/* {user.org.id && <Outlet />} */}
          <Outlet />
        </section>
    </main>
  );
}

export default Layout;
