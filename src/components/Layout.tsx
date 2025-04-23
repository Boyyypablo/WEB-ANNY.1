
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-anny-bg">
      <Header />
      <main className="flex-1 pb-16 md:pb-0 container mx-auto px-4 pt-4">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;
