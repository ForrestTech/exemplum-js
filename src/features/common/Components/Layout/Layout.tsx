import { Footer } from "../Footer/Footer";
import { NavBar } from "../Navbar/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full bg-white dark:bg-neutral-800">
        <NavBar />
        <main className="container mx-auto min-h-screen p-4">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
