import { Outlet } from "react-router";
import Footer from "../components/footer";
import Header from "../components/header";
import { Toaster } from "@/components/ui/toaster";

export default function Layout() {
  return (
    <div className="flex flex-col min-w-[72.5rem] min-h-screen w-full bg-[#F1F1F2] overflow-hidden">
      <Toaster />
      <Header />
      <div className="flex-1 max-w-[72.5rem] w-full mx-auto mt-5 mb-[3.75rem]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
