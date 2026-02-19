import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { UserRole } from "../../app/entities/User";
import { useAuth } from "../../app/hooks/useAuth";
import NotFoundOrgPage from "../page/org/notFoundOrg/NotFoundOrg";
import Sidebar from "./components/sidebar";

function Layout() {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  const role = user.role;

  if (role === UserRole.WAITER || role === UserRole.CLIENT) {
    signOut();
    toast.error(
      "Unauthorized access. Please log in with an appropriate account.",
    );
    return null;
  }

  return (
    <main className="bg-[#FAFAFA] w-full flex h-screen">
      {(role === UserRole.OWNER || role === UserRole.ADMIN) && <Sidebar />}
      <section className="w-full h-full p-6 overflow-y-auto rounded-tl-4xl rounded-bl-4xl bg-white shadow">
        {!user.org.id && <NotFoundOrgPage />}
        {user.org.id && <Outlet />}
      </section>
    </main>
  );
}

export default Layout;
