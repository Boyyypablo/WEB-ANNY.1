
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="min-h-screen flex bg-anny-bg">
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <div className="flex-1 flex flex-col pb-16 lg:pb-0">
        <Header />
        <main className="flex-1 container mx-auto px-4 pt-4">
          <Outlet />
        </main>
        <div className="lg:hidden">
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Layout;
